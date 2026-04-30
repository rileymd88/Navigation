import type { Category } from "../types";

type AppWithSession = EngineAPI.IApp & {
  session?: {
    config?: {
      url: string;
    };
  };
  storeTempSelectionState?: () => Promise<string>;
};

type CurrentSelectionItem = {
  qField: string;
  qReadableName?: string;
  qSelectedCount: number;
  qSortIndex?: number;
  stateName?: string;
};

type SelectionLayout = {
  qSelectionObject?: {
    qSelections?: CurrentSelectionItem[];
  };
  selectionsInStates?: Array<{
    stateName?: string;
    qSelectionObject?: {
      qSelections?: CurrentSelectionItem[];
    };
  }>;
};

type ListObjectCell = {
  qText?: string;
  qNum?: number | string;
};

type ListObjectDataPage = {
  qMatrix?: ListObjectCell[][];
};

export type SelectionTransferParam = {
  stateName: string;
  field: string;
  values: Array<string | number>;
};

const CLOUD_USER_ENDPOINT = "../api/v1/users/me";
const DEFAULT_STATE_NAME = "$";
const SELECTED_VALUES_PAGE_SIZE = 10000;

let cloudEnvironmentPromise: Promise<boolean> | undefined;

export const resetCloudEnvironmentCache = () => {
  cloudEnvironmentPromise = undefined;
};

export const isCloudEnvironment = async (
  fetchImpl: typeof fetch | undefined = typeof fetch === "function" ? fetch : undefined
): Promise<boolean> => {
  if (cloudEnvironmentPromise) {
    return cloudEnvironmentPromise;
  }

  cloudEnvironmentPromise = (async () => {
    if (typeof fetchImpl !== "function") {
      return false;
    }

    try {
      const response = await fetchImpl(CLOUD_USER_ENDPOINT, {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
        },
        redirect: "follow",
      });

      if (!response.ok || typeof response.json !== "function") {
        return false;
      }

      const data = await response.json();
      return data !== null && typeof data === "object" && !Array.isArray(data);
    } catch (error) {
      return false;
    }
  })();

  return cloudEnvironmentPromise;
};

export const buildCloudAppUrl = async (app: AppWithSession, category: Category): Promise<string> => {
  const tempBookmark = app.storeTempSelectionState && (await app.storeTempSelectionState());
  return `${buildAppSheetUrl(category)}/tempselectionstate/${encodeURIComponent(tempBookmark as string)}`;
};

const buildAppSheetUrl = (category: Category) =>
  `../sense/app/${encodeURIComponent(category.appId)}/sheet/${encodeURIComponent(category.sheetId)}`;

const encodeSenseSelectionPart = (value: string | number) => encodeURIComponent(String(value)).replace(/%2F/g, "/");

const formatSelectionField = (stateName: string, field: string) =>
  stateName && stateName !== DEFAULT_STATE_NAME ? `${stateName}::${field}` : field;

export const formatClientManagedSelectionPath = ({ stateName, field, values }: SelectionTransferParam) => {
  if (!values.length) {
    return "";
  }

  const formattedValues = values.map((value) => `[${encodeSenseSelectionPart(value)}]`).join(";");
  return `select/${encodeSenseSelectionPart(formatSelectionField(stateName, field))}/${formattedValues}`;
};

export const buildClientManagedAppUrl = (category: Category, selections: SelectionTransferParam[]) => {
  const selectPath = selections
    .map(formatClientManagedSelectionPath)
    .filter(Boolean)
    .join("/");

  return selectPath ? `${buildAppSheetUrl(category)}/state/analysis/${selectPath}` : buildAppSheetUrl(category);
};

const getCurrentSelectionsLayout = async (app: AppWithSession): Promise<SelectionLayout> => {
  if (typeof (app as any).getCurrentSelectionObject === "function") {
    const model = await (app as any).getCurrentSelectionObject();
    return model.getLayout();
  }

  const model = await (app as any).createSessionObject({
    qInfo: {
      qType: "CurrentSelections",
      qId: "CurrentSelections",
    },
    qSelectionObjectDef: {
      qStateName: DEFAULT_STATE_NAME,
    },
  });

  try {
    return model.getLayout();
  } finally {
    if (typeof model.close === "function") {
      await model.close();
    }
  }
};

const getSelectionsFromLayout = (layout: SelectionLayout): CurrentSelectionItem[] => {
  if (layout.selectionsInStates?.length) {
    return layout.selectionsInStates.flatMap((selectionsInState) =>
      (selectionsInState.qSelectionObject?.qSelections || []).map((selection) => ({
        ...selection,
        stateName: selectionsInState.stateName || DEFAULT_STATE_NAME,
      }))
    );
  }

  return (layout.qSelectionObject?.qSelections || []).map((selection) => ({
    ...selection,
    stateName: selection.stateName || DEFAULT_STATE_NAME,
  }));
};

const getAllowedSelectionFields = (category: Category) => {
  if (!category.limitSelectionTransfer) {
    return undefined;
  }

  return new Set((category.selectionTransferFields || []).filter((item) => item.field).map((item) => item.field));
};

const toSelectionValue = (cell: ListObjectCell): string | number => {
  const numericValue = Number(cell.qNum);
  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  return cell.qText || "";
};

const createFieldSelectionListObject = (app: AppWithSession, field: string, stateName: string) => {
  return (app as any).createSessionObject({
    qInfo: {
      qType: "sn-navigation-selection-transfer",
    },
    qListObjectDef: {
      qStateName: stateName,
      qDef: {
        qFieldDefs: [field],
        qFieldLabels: [field],
        qSortCriterias: [
          {
            qSortByState: 1,
            qSortByLoadOrder: 1,
            qSortByNumeric: 1,
            qSortByAscii: 1,
          },
        ],
      },
      qShowAlternatives: true,
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 0,
        },
      ],
    },
  });
};

export const getSelectedFieldValues = async (
  app: AppWithSession,
  field: string,
  stateName: string,
  selectedCount: number
): Promise<Array<string | number>> => {
  if (!selectedCount) {
    return [];
  }

  const model = await createFieldSelectionListObject(app, field, stateName);

  try {
    const values: Array<string | number> = [];
    const pageCount = Math.ceil(selectedCount / SELECTED_VALUES_PAGE_SIZE);

    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const qTop = pageIndex * SELECTED_VALUES_PAGE_SIZE;
      const qHeight = Math.min(SELECTED_VALUES_PAGE_SIZE, selectedCount - qTop);
      const pages: ListObjectDataPage[] = await model.getListObjectData("/qListObjectDef", [
        {
          qTop,
          qLeft: 0,
          qWidth: 1,
          qHeight,
        },
      ]);

      pages[0]?.qMatrix?.forEach(([cell]) => {
        if (cell) {
          values.push(toSelectionValue(cell));
        }
      });
    }

    return values;
  } finally {
    if (typeof model.close === "function") {
      await model.close();
    }
  }
};

export const getSelectionTransferParams = async (
  app: AppWithSession,
  category: Category
): Promise<SelectionTransferParam[]> => {
  const layout = await getCurrentSelectionsLayout(app);
  const allowedFields = getAllowedSelectionFields(category);
  const selections = getSelectionsFromLayout(layout)
    .filter((selection) => !allowedFields || allowedFields.has(selection.qField))
    .sort(
      (left, right) =>
        (left.stateName || DEFAULT_STATE_NAME).localeCompare(right.stateName || DEFAULT_STATE_NAME) ||
        (left.qSortIndex || 0) - (right.qSortIndex || 0) ||
        left.qField.localeCompare(right.qField)
    );

  return Promise.all(
    selections.map(async (selection) => ({
      stateName: selection.stateName || DEFAULT_STATE_NAME,
      field: selection.qField,
      values: await getSelectedFieldValues(
        app,
        selection.qField,
        selection.stateName || DEFAULT_STATE_NAME,
        selection.qSelectedCount
      ),
    }))
  );
};
