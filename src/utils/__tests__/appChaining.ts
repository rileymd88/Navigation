import type { Category } from "../../types";
import {
  buildClientManagedAppUrl,
  buildCloudAppUrl,
  formatClientManagedSelectionPath,
  getSelectedFieldValues,
  getSelectionTransferParams,
  isCloudEnvironment,
  resetCloudEnvironmentCache,
} from "../appChaining";

const createCategory = (overrides: Partial<Category> = {}): Category => ({
  label: "Target app",
  navigateToSheet: false,
  sheet: "",
  subCategory: false,
  showNavigation: true,
  navigation: "goToApp",
  appId: "target app.qvf",
  sameWindow: true,
  sheetId: "target sheet",
  websiteUrl: "",
  categories: [],
  showIcon: false,
  showDivider: false,
  icon: "None",
  showHide: "1",
  cId: "category-1",
  limitSelectionTransfer: false,
  selectionTransferFields: [],
  ...overrides,
});

const createApp = (overrides: Record<string, unknown> = {}) =>
  ({
    session: {
      config: {
        url: "wss://sense.example.com/virtual-proxy/app/source-app",
      },
    },
    ...overrides,
  }) as any;

const createFetchResponse = (ok: boolean, json: () => Promise<unknown>) =>
  ({
    ok,
    json,
  }) as Response;

describe("app chaining cloud detection", () => {
  afterEach(() => {
    resetCloudEnvironmentCache();
  });

  it("returns true and caches when users/me returns a JSON object", async () => {
    const fetchMock = jest.fn().mockResolvedValue(createFetchResponse(true, async () => ({ id: "user-1" })));

    await expect(isCloudEnvironment(fetchMock as unknown as typeof fetch)).resolves.toBe(true);
    await expect(isCloudEnvironment(fetchMock as unknown as typeof fetch)).resolves.toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("../api/v1/users/me", {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
      },
      redirect: "follow",
    });
  });

  it("returns false for failed fetches, non-OK responses, and invalid JSON", async () => {
    await expect(isCloudEnvironment(undefined)).resolves.toBe(false);

    resetCloudEnvironmentCache();
    const failedFetch = jest.fn().mockRejectedValue(new Error("network"));
    await expect(isCloudEnvironment(failedFetch as unknown as typeof fetch)).resolves.toBe(false);

    resetCloudEnvironmentCache();
    const notFoundFetch = jest.fn().mockResolvedValue(createFetchResponse(false, async () => ({ errors: [] })));
    await expect(isCloudEnvironment(notFoundFetch as unknown as typeof fetch)).resolves.toBe(false);

    resetCloudEnvironmentCache();
    const invalidJsonFetch = jest.fn().mockResolvedValue(createFetchResponse(true, async () => "not an object"));
    await expect(isCloudEnvironment(invalidJsonFetch as unknown as typeof fetch)).resolves.toBe(false);
  });
});

describe("app chaining URL generation", () => {
  it("preserves the existing cloud app chaining URL", async () => {
    const app = createApp({
      storeTempSelectionState: jest.fn().mockResolvedValue("temporary bookmark"),
    });

    await expect(buildCloudAppUrl(app, createCategory())).resolves.toBe(
      "../sense/app/target%20app.qvf/sheet/target%20sheet/tempselectionstate/temporary%20bookmark"
    );
  });

  it("appends encoded selection path segments to the existing app chaining URL", () => {
    const url = buildClientManagedAppUrl(createCategory(), [
      {
        stateName: "$",
        field: "Field A",
        values: ["a&b", 1],
      },
      {
        stateName: "State 2",
        field: "Fält C",
        values: ["x,y", "å"],
      },
    ]);

    expect(url).toBe(
      "../sense/app/target%20app.qvf/sheet/target%20sheet/state/analysis/select/Field%20A/[a%26b];[1]/select/State%202%3A%3AF%C3%A4lt%20C/[x%2Cy];[%C3%A5]"
    );
  });

  it("omits select parameters when no selections are available", () => {
    expect(buildClientManagedAppUrl(createCategory(), [])).toBe("../sense/app/target%20app.qvf/sheet/target%20sheet");
  });

  it("omits empty selection values", () => {
    expect(formatClientManagedSelectionPath({ stateName: "$", field: "Field", values: [] })).toBe("");
  });

  it("matches Qlik Sense client-managed selection URL encoding", () => {
    const url = buildClientManagedAppUrl(
      createCategory({
        appId: "0c5331b1-4767-4789-b80f-62a20bfc7a23",
        sheetId: "31f595f0-08ad-4858-9190-458546e138f5",
      }),
      [
        { stateName: "$", field: "Gemini Services", values: ["Yes"] },
        { stateName: "$", field: "YearWeek", values: ["16-26"] },
        { stateName: "$", field: "Month", values: ["Apr"] },
        { stateName: "$", field: "HLP Region", values: ["E / EUROPE", "L / L.AMERICA"] },
      ]
    );

    expect(url).toBe(
      "../sense/app/0c5331b1-4767-4789-b80f-62a20bfc7a23/sheet/31f595f0-08ad-4858-9190-458546e138f5/state/analysis/select/Gemini%20Services/[Yes]/select/YearWeek/[16-26]/select/Month/[Apr]/select/HLP%20Region/[E%20/%20EUROPE];[L%20/%20L.AMERICA]"
    );
  });
});

describe("app chaining selection transfer", () => {
  const createSelectionApp = (layout: any, fieldValues: Record<string, Array<{ qText?: string; qNum?: number | string }>>) => {
    const createdObjects: any[] = [];
    const app = createApp({
      getCurrentSelectionObject: jest.fn().mockResolvedValue({
        getLayout: jest.fn().mockResolvedValue(layout),
      }),
      createSessionObject: jest.fn().mockImplementation(async (props: any) => {
        const field = props.qListObjectDef.qDef.qFieldDefs[0];
        const model = {
          props,
          getListObjectData: jest.fn(async (_path: string, [page]: any[]) => [
            {
              qMatrix: (fieldValues[field] || [])
                .slice(page.qTop, page.qTop + page.qHeight)
                .map((cell) => [cell]),
            },
          ]),
          close: jest.fn(),
        };
        createdObjects.push(model);
        return model;
      }),
    });

    return { app, createdObjects };
  };

  it("extracts all selected values when field filtering is off", async () => {
    const { app } = createSelectionApp(
      {
        qSelectionObject: {
          qSelections: [
            {
              qField: "Country",
              qSelectedCount: 7,
              qSelected: "7 of 20",
              qSortIndex: 0,
            },
          ],
        },
      },
      {
        Country: ["Sweden", "Germany", "Spain", "France", "Italy", "Japan", "USA"].map((qText) => ({
          qText,
          qNum: "NaN",
        })),
      }
    );

    await expect(getSelectionTransferParams(app, createCategory())).resolves.toEqual([
      {
        stateName: "$",
        field: "Country",
        values: ["Sweden", "Germany", "Spain", "France", "Italy", "Japan", "USA"],
      },
    ]);
  });

  it("uses configured fields as the enabled filter allowlist and ignores duplicates", async () => {
    const { app } = createSelectionApp(
      {
        qSelectionObject: {
          qSelections: [
            { qField: "A", qSelectedCount: 1, qSortIndex: 0 },
            { qField: "B", qSelectedCount: 1, qSortIndex: 1 },
            { qField: "C", qSelectedCount: 1, qSortIndex: 2 },
          ],
        },
      },
      {
        A: [{ qText: "a", qNum: "NaN" }],
        B: [{ qText: "b", qNum: "NaN" }],
        C: [{ qText: "c", qNum: "NaN" }],
      }
    );

    await expect(
      getSelectionTransferParams(
        app,
        createCategory({
          limitSelectionTransfer: true,
          selectionTransferFields: [{ field: "B" }, { field: "C" }, { field: "C" }],
        })
      )
    ).resolves.toEqual([
      {
        stateName: "$",
        field: "B",
        values: ["b"],
      },
      {
        stateName: "$",
        field: "C",
        values: ["c"],
      },
    ]);
  });

  it("sends no selections when filtering is enabled but no fields are configured", async () => {
    const { app } = createSelectionApp(
      {
        qSelectionObject: {
          qSelections: [{ qField: "A", qSelectedCount: 1, qSortIndex: 0 }],
        },
      },
      {
        A: [{ qText: "a", qNum: "NaN" }],
      }
    );

    await expect(
      getSelectionTransferParams(
        app,
        createCategory({
          limitSelectionTransfer: true,
          selectionTransferFields: [],
        })
      )
    ).resolves.toEqual([]);
  });

  it("preserves alternate state names when the current selections layout exposes them", async () => {
    const { app } = createSelectionApp(
      {
        selectionsInStates: [
          {
            stateName: "$",
            qSelectionObject: {
              qSelections: [{ qField: "Year", qSelectedCount: 1, qSortIndex: 0 }],
            },
          },
          {
            stateName: "Comparison State",
            qSelectionObject: {
              qSelections: [{ qField: "Month", qSelectedCount: 1, qSortIndex: 0 }],
            },
          },
        ],
      },
      {
        Year: [{ qText: "2024", qNum: 2024 }],
        Month: [{ qText: "April", qNum: "NaN" }],
      }
    );

    await expect(getSelectionTransferParams(app, createCategory())).resolves.toEqual([
      {
        stateName: "$",
        field: "Year",
        values: [2024],
      },
      {
        stateName: "Comparison State",
        field: "Month",
        values: ["April"],
      },
    ]);
  });

  it("pages selected field values and closes the transient list object", async () => {
    const getListObjectData = jest
      .fn()
      .mockResolvedValueOnce([{ qMatrix: [[{ qText: "first", qNum: "NaN" }]] }])
      .mockResolvedValueOnce([{ qMatrix: [[{ qText: "10001", qNum: 10001 }]] }]);
    const close = jest.fn();
    const app = createApp({
      createSessionObject: jest.fn().mockResolvedValue({
        getListObjectData,
        close,
      }),
    });

    await expect(getSelectedFieldValues(app, "Field", "$", 10001)).resolves.toEqual(["first", 10001]);
    expect(getListObjectData).toHaveBeenNthCalledWith(1, "/qListObjectDef", [
      { qTop: 0, qLeft: 0, qWidth: 1, qHeight: 10000 },
    ]);
    expect(getListObjectData).toHaveBeenNthCalledWith(2, "/qListObjectDef", [
      { qTop: 10000, qLeft: 0, qWidth: 1, qHeight: 1 },
    ]);
    expect(close).toHaveBeenCalled();
  });
});
