import { stardust } from "@nebula.js/stardust";
import type { Category, Layout, NavigationProps } from "./types";

interface CategorySchema {
  [key: string]: any;
  type?: string;
  ref?: string;
  label?: string;
  items?: {
    [key: string]: CategorySchema;
  };
}

const ICONS = [
  "None",
  "Abc",
  "Abort",
  "Add",
  "Aggregation",
  "Alert",
  "AlignmentBottomOutline",
  "AlignmentHorizontalOutline",
  "AlignmentLeftOutline",
  "AlignmentRightOutline",
  "AlignmentTopOutline",
  "AlignmentVerticalOutline",
  "AlignCenter",
  "AlignLeft",
  "AlignObjectCenter",
  "AlignObjectLeft",
  "AlignObjectRight",
  "AlignRight",
  "All",
  "All2",
  "Analyze",
  "Application",
  "Approve",
  "ArrowDown",
  "ArrowDown2",
  "ArrowLeft",
  "ArrowLeftStop",
  "ArrowRight",
  "ArrowRightStop",
  "ArrowUp",
  "ArrowUp2",
  "Ascending",
  "Associate",
  "AssociationOutline",
  "Automation",
  "AutoLayout",
  "AutoLayoutOutline",
  "Axis",
  "Back",
  "BarsGrouped",
  "BarsGroupedHorizontal",
  "BarsGroupedHorizontalOutline",
  "BarsGroupedOutline",
  "BarsHorizontal",
  "BarsStacked",
  "BarsStackedHorizontal",
  "BarsStackedHorizontalOutline",
  "BarsStackedOutline",
  "BarsVertical",
  "BarChart",
  "BarChartHorizontal",
  "BarChartOutline",
  "Bell",
  "BellOutline",
  "Bin",
  "Binoculars",
  "BinOutline",
  "Bold",
  "Book",
  "Bookmark",
  "Bookmark2",
  "BookOutline",
  "Box",
  "Boxplot",
  "BoxOutline",
  "BreakAssociation",
  "Brushes",
  "Bubbles",
  "Building",
  "Bullet-list",
  "BulletChart",
  "BulletChartOutline",
  "BusinessLogic",
  "ButtonOutline",
  "Calendar",
  "Camera",
  "Catalog",
  "Chart",
  "ChartObject",
  "ChartObjectOutline",
  "Chat",
  "ChatOutline",
  "CheckboxIndetermined",
  "CheckboxTick",
  "Chevleft",
  "Chevright",
  "ClearFilter",
  "ClearFormatOutline",
  "ClearSelections",
  "Clipboard",
  "Clock",
  "Clock2",
  "Close",
  "Cloud",
  "CloudUpload",
  "Code",
  "CodeOutline",
  "Cognitive",
  "Cogwheel",
  "CogwheelOutline",
  "Collapse",
  "Collapse2",
  "Collapse3",
  "Collapse4",
  "Collapse5",
  "Collection",
  "Collection2",
  "Columns",
  "ColumnMove",
  "ColumnSize",
  "ComboChart",
  "ComboChartOutline",
  "Comment",
  "CommentOutline",
  "Compass",
  "Configuration",
  "Constraints",
  "Container",
  "Control",
  "ControlOutline",
  "Copy",
  "Corner",
  "CreditCard",
  "Cross",
  "Crosshair",
  "Cube",
  "CustomUi",
  "Cut",
  "Data-gateway",
  "Database",
  "DatabaseAdd",
  "DatabaseArrow",
  "DatabaseArrowOutline",
  "DatabaseOutline",
  "Dataset",
  "DataAssetOutline",
  "DataClass",
  "DataManager",
  "DataManagerOutline",
  "DataModel",
  "DataModelOutline",
  "Debug",
  "DebugOutline",
  "Default",
  "Descending",
  "DeselectAll",
  "Dimension",
  "Direction",
  "DirectionBottomOutline",
  "DirectionDownOutline",
  "DirectionLeft",
  "DirectionLeftRight",
  "DirectionRight",
  "DirectionTopOutline",
  "DirectionUpDown",
  "DirectionUpOutline",
  "DirectDiscovery",
  "Disconnect",
  "Dislike",
  "DislikeOutlined",
  "Distributionplot",
  "DistributionPlotOutline",
  "Dot",
  "Download",
  "DownloadSuccess",
  "Draggable",
  "DrillDown",
  "Drop",
  "DropdownArrow",
  "Duplicate",
  "DuplicateOutline",
  "DynamicObject",
  "DynamicView",
  "Edit",
  "EditChart",
  "EditList",
  "EditListOutline",
  "EditOutline",
  "Effects",
  "EffectsOutline",
  "Embed",
  "Engine",
  "EngineerOutline",
  "Evaluation",
  "Expand",
  "Expand2",
  "Experiment",
  "Explain",
  "Export",
  "Expression",
  "Field",
  "File",
  "FileSetup",
  "Filter",
  "Filter2",
  "Filterpane",
  "FilterpaneOutline",
  "Flag",
  "Flow",
  "Folder",
  "FolderOutline",
  "FolderQ",
  "Fort",
  "Forward",
  "From",
  "FullWidth",
  "Funnel",
  "GaugeChart",
  "GaugeChartOutline",
  "GaugeGauge",
  "GaugeVerticalBar",
  "GeneralDataClass",
  "GlobalSelector",
  "Globe",
  "Goto",
  "Grid",
  "GridChart",
  "GridChartOutline",
  "GridMenu",
  "GridMenuOutline",
  "GridOutline",
  "Group",
  "GroupOutline",
  "Hand",
  "Handle",
  "HandleHorizontal",
  "Help",
  "HelpOutline",
  "HighResolution",
  "Histogram",
  "HistogramOutline",
  "History",
  "Home",
  "Home2",
  "HomeRemove",
  "Hourglass",
  "HourglassOutline",
  "Hub-logo",
  "Idle",
  "IdleOutline",
  "Image",
  "ImageOutline",
  "ImpactAnalysis",
  "Import",
  "Inbox",
  "Indent",
  "Info",
  "InfoOutline",
  "Inline",
  "Insert",
  "InsertScriptOutline",
  "Italic",
  "Join",
  "Key",
  "KeyboardShortcut",
  "KeyDriverOutline",
  "KeyOutline",
  "Kpi",
  "KpiOutline",
  "Landing",
  "Lasso",
  "LayerOutline",
  "LayoutContainerOutline",
  "LeftRight",
  "Library",
  "License",
  "Lightbulb",
  "Lightbulb2",
  "Like",
  "LikeOutlined",
  "Lineage",
  "LineChart",
  "LineChartArea",
  "LineChartAreaOutline",
  "LineChartLine",
  "LineChartLineOutline",
  "LineObject",
  "Link",
  "LinkOutline",
  "List",
  "ListLoose",
  "Lock",
  "LockOutline",
  "LogIn",
  "LogOut",
  "LowResolution",
  "Mail",
  "Mail2",
  "Mail3",
  "Map",
  "MapOutline",
  "Marimekko",
  "Mashup",
  "Maximize",
  "Measure",
  "Megaphone",
  "Menu",
  "Microphone",
  "Minimize",
  "Minus",
  "Minus2",
  "MinusOutline",
  "ModelMetrics",
  "MonitorViewOutline",
  "More",
  "MoreRounded",
  "MoreVertical",
  "NaturalLanguageGeneration",
  "NetworkFolder",
  "NewFolder",
  "NewTab",
  "Next",
  "Note",
  "Number",
  "Numbered-list",
  "Object",
  "Objects",
  "Onboard",
  "Operation",
  "Operators",
  "Optimize",
  "OrgChart",
  "OrgChartOutline",
  "Palette",
  "PaletteOutline",
  "Pan",
  "Paperclip",
  "Paste",
  "Pause",
  "PauseOutline",
  "Person",
  "Phone",
  "PhoneAdd",
  "PhoneRemove",
  "PhotoLibrary",
  "PhotoLibraryOutline",
  "PieChart",
  "PieChartDonut",
  "PieChartDonutOutline",
  "PieChartOutline",
  "PieChartPie",
  "Pivot",
  "PivotTable",
  "PivotTableOutline",
  "Play",
  "Play2",
  "Play2Outline",
  "Plugin",
  "Plus",
  "PlusOutline",
  "PositionBottomCenter",
  "PositionBottomLeft",
  "PositionBottomRight",
  "PositionMiddleCenter",
  "PositionMiddleLeft",
  "PositionMiddleRight",
  "PositionTopCenter",
  "PositionTopLeft",
  "PositionTopRight",
  "Previous",
  "Print",
  "PrintOutline",
  "Processor",
  "Profile",
  "Project",
  "Proton",
  "Proxy",
  "ProxyOutline",
  "Publish",
  "PublishedToStream",
  "Puzzle",
  "PuzzleOutline",
  "RadialSelect",
  "RadiobuttonDot",
  "Rate",
  "Recovery",
  "Reload",
  "Remove",
  "RemoveOutline",
  "ReorderOutline",
  "Repair",
  "Replace",
  "ReportOutline",
  "Reset",
  "ResetOutline",
  "Resizer",
  "Restricted",
  "Return",
  "Rocket",
  "Rows",
  "RowMove",
  "RowSize",
  "Rule",
  "Rule2",
  "Run",
  "RunOutline",
  "RunScript",
  "Sankey",
  "Save",
  "ScaleRatio",
  "ScatterChart",
  "ScatterChartOutline",
  "Schedule",
  "Script",
  "ScriptOk",
  "Search",
  "SearchOutline",
  "Sections",
  "Selection",
  "SelectionsBack",
  "SelectionsForward",
  "SelectionsReload",
  "SelectionsTool",
  "SelectionSearch",
  "SelectAll",
  "SelectAlternative",
  "SelectExcluded",
  "SelectPossible",
  "Send",
  "SendOutline",
  "Server",
  "Settings",
  "Shapes",
  "ShapesOutline",
  "Share",
  "Sheet",
  "SheetOutline",
  "Shield",
  "Shop",
  "Shuffle",
  "SignPost",
  "Slider",
  "SlideshowOutline",
  "SlideShow",
  "Smiley",
  "Spaces",
  "SpaceData",
  "SpaceManaged",
  "SpaceManaged2",
  "SpaceShared",
  "Sparkle",
  "Split",
  "Star",
  "Star2",
  "StarSchema",
  "StepIn",
  "StepInOutline",
  "StepOver",
  "Stop",
  "StopOutline",
  "Stream",
  "StrenghtEmpty",
  "StrenghtHigh",
  "StrenghtLow",
  "StrenghtMedium",
  "Submit",
  "Success",
  "SuccessOutline",
  "Swap",
  "Sync",
  "TabbedContainerOutline",
  "Table",
  "TableAdd",
  "TableConnect",
  "TableEdit",
  "TableOk",
  "TableOutline",
  "TableSync",
  "Tag",
  "Tag2",
  "Target",
  "TaskChain",
  "Team",
  "Templates",
  "Text",
  "TextObject",
  "Tick",
  "ToggleBottom",
  "ToggleLeft",
  "ToggleRight",
  "ToggleTop",
  "Tooltip",
  "Top",
  "Touch",
  "Transfer",
  "Transform",
  "Treemap",
  "TreemapOutline",
  "TreeView",
  "TrellisChart",
  "TrendingDown",
  "TrendingNeutral",
  "TrendingUp",
  "TrendCompass",
  "TriangleBottom",
  "TriangleLeft",
  "TriangleRight",
  "TriangleTop",
  "Trophy",
  "Type",
  "Unapprove",
  "Undent",
  "Underline",
  "Uninstall",
  "Unlink",
  "UnlinkOutline",
  "Unlock",
  "UnlockOutline",
  "UnorderedList",
  "Unpublish",
  "Unsync",
  "Upload",
  "UpDown",
  "UserOutline",
  "Variables",
  "VariablesOutline",
  "Video",
  "VideoOutline",
  "View",
  "ViewDisabled",
  "ViewDisabledOutline",
  "ViewOutline",
  "Volume",
  "Warning",
  "Warning2",
  "WarningTriangle",
  "WarningTriangle2",
  "Waterfallchart",
  "WaterfallChartOutline",
  "Webhooks",
  "Widget",
  "ZoomIn",
  "ZoomInOutline",
  "ZoomOut",
  "ZoomOutOutline",
].map((icon: string) => ({
  value: icon,
  label: icon,
}));

const FONTS = [
  "Abril Fatface, serif",
  "Bangers, fantasy",
  "Bebas Neue, sans serif",
  "EB Garamond, serif",
  "Fredoka One, fantasy",
  "Graduate, fantasy",
  "Gravitas One, serif",
  "Indie Flower, fantasy",
  "Inter, sans-serif",
  "Lobster, fantasy",
  "Montserrat, sans-serif",
  "Nixie One, sans-serif",
  "Noto Sans, sans-serif",
  "Open Sans, sans-serif",
  "PT Serif, serif",
  "Pacifico, cursive",
  "Permanent Marker, fantasy",
  "QlikView Sans, sans-serif",
  "Raleway, sans-serif",
  "Rammetto One, fantasy",
  "Roboto, sans-serif",
  "Source Sans Pro, sans-serif",
  "Titan One, fantasy",
  "Yanone Kaffeesatz, sans-serif",
].map((font: string) => ({
  value: font,
  label: font,
}));

const getColor = (
  ref: keyof NavigationProps,
  translation: string,
  color: string,
  disableNone: boolean,
  category?: boolean,
  show?: (item: any) => boolean
) => {
  return {
    component: "color-picker",
    type: "object",
    ref: category ? ref : `navigation.${ref}`,
    translation,
    disableNone,
    dualOutput: true,
    defaultValue: {
      color,
      index: "-1",
    },
    show,
  };
};

const getColorType = (
  ref: keyof NavigationProps,
  translation: string,
  category?: boolean,
  show?: (item: any) => boolean
) => {
  return {
    translation,
    component: "dropdown",
    dropdownOnly: true,
    type: "string",
    ref: category ? `${ref}Type` : `navigation.${ref}Type`,
    defaultValue: "singleColor",
    options: [
      { value: "singleColor", label: "Single color" },
      { value: "byExpression", label: "Expression" },
    ],
    show,
  };
};

const getColorExp = (
  ref: keyof NavigationProps,
  translation: string,
  defaultValue: string,
  category?: boolean,
  show?: (item: any) => boolean
) => {
  return {
    type: "string",
    expression: "optional",
    ref: category ? `${ref}Exp` : `navigation.${ref}Exp`,
    defaultValue,
    translation,
    show,
  };
};

export default function ext(theme: stardust.Theme, translator: stardust.Translator, flags: stardust.Flags) {
  const generateCategorySchema = (maxDepth: number, currentDepth: number = 0): CategorySchema => {
    if (currentDepth >= maxDepth) return {};
    const categoryLabel = currentDepth === 0 ? "Add category" : "Add sub-category";
    return {
      type: "array",
      ref: "categories",
      label: "Categories",
      itemTitleRef: "label",
      allowAdd: true,
      allowRemove: true,
      addTranslation: categoryLabel,
      items: {
        label: {
          type: "string",
          ref: "label",
          label: "Label",
          expression: "optional",
        },
        showIcon: {
          type: "boolean",
          component: "switch",
          ref: "showIcon",
          label: "Show icon",
          defaultValue: false,
          options: [
            {
              value: true,
              translation: "properties.on",
            },
            {
              value: false,
              translation: "properties.off",
            },
          ],
        },
        icon: {
          label: "Icon",
          component: "expression-with-dropdown",
          dropdownOnly: true,
          type: "string",
          ref: "icon",
          defaultValue: "None",
          options: ICONS,
          show: (item: Category) => item.showIcon,
        },
        showDivider: {
          type: "boolean",
          component: "switch",
          ref: "showDivider",
          label: "Show divider",
          defaultValue: false,
          options: [
            {
              value: true,
              translation: "properties.on",
            },
            {
              value: false,
              translation: "properties.off",
            },
          ],
        },
        showNavigation: {
          type: "boolean",
          component: "switch",
          ref: "showNavigation",
          label: "Navigate",
          defaultValue: false,
          options: [
            {
              value: true,
              translation: "properties.on",
            },
            {
              value: false,
              translation: "properties.off",
            },
          ],
        },
        navigation: {
          translation: "Object.ActionButton.Navigation",
          component: "expression-with-dropdown",
          defaultValue: "goToSheet",
          dropdownOnly: true,
          type: "string",
          ref: "navigation",
          options: [
            { value: "goToSheet", translation: "Object.ActionButton.GoToASheet" },
            { value: "goToSheetById", translation: "Object.ActionButton.GoToSheetById" },
            { value: "goToApp", translation: "Object.ActionButton.DocumentChain" },
            { value: "goToWebsite", translation: "Object.ActionButton.OpenWebsiteEmail" },
          ],
          show: (item: Category) => item.showNavigation,
        },
        sheet: {
          ref: "sheet",
          translation: "properties.sheet",
          type: "string",
          component: "expression-with-dropdown",
          show: (item: Category) => item.navigation === "goToSheet" && item.showNavigation,
          options: async (_: any, hyperCubeHandler: any) => {
            const sheets = await hyperCubeHandler.app.getSheetList();
            return sheets.map((sheet: any) => ({
              value: sheet.qInfo.qId,
              label: sheet.qMeta.title,
              showCondition: sheet.qData.showCondition,
            }));
          },
        },
        appId: {
          type: "string",
          expression: "optional",
          ref: "appId",
          translation: "properties.appId",
          show: (item: Category) => item.navigation === "goToApp" && item.showNavigation,
        },
        sheetId: {
          type: "string",
          ref: "sheetId",
          translation: "properties.sheet",
          expression: "optional",
          show: (item: Category) =>
            (item.navigation === "goToApp" || item.navigation === "goToSheetById") && item.showNavigation,
        },
        websiteUrl: {
          type: "string",
          expression: "optional",
          ref: "websiteUrl",
          translation: "properties.website",
          show: (item: Category) => item.navigation === "goToWebsite" && item.showNavigation,
        },
        sameWindow: {
          type: "boolean",
          ref: "sameWindow",
          translation: "properties.sameWindow",
          show: (item: Category) =>
            (item.navigation === "goToApp" || item.navigation === "goToWebsite") && item.showNavigation,
          defaultValue: true,
        },
        showHide: {
          type: "string",
          ref: "showHide",
          label: "Calculation condition",
          defaultValue: "1",
          expression: "optional",
        },
        categories: {
          ...generateCategorySchema(maxDepth, currentDepth + 1),
        },
      },
    };
  };

  const maxDepth = 3;
  const categories = generateCategorySchema(maxDepth);
  const navigation = {
    type: "items",
    label: "Navigation",
    component: "items",
    items: {
      categories,
    },
  };

  const fontFamily = {
    component: "expression-with-dropdown",
    dropdownOnly: true,
    type: "string",
    translation: "Font family",
    ref: "navigation.fontFamily",
    options: FONTS,
    defaultValue: "Source Sans Pro, sans-serif",
  };

  const fontSize = {
    type: "string",
    expression: "optional",
    defaultValue: "14px",
    ref: "navigation.fontSize",
    translation: "Font size",
  };

  const drawer = {
    type: "boolean",
    component: "switch",
    ref: "navigation.drawer",
    label: "Drawer",
    defaultValue: false,
    options: [
      {
        value: true,
        translation: "properties.on",
      },
      {
        value: false,
        translation: "properties.off",
      },
    ],
  };

  const drawerLocation = {
    label: "Orientation",
    component: "dropdown",
    dropdownOnly: true,
    type: "string",
    ref: "navigation.drawerLocation",
    defaultValue: "left",
    options: [
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
    ],
    show: (item: Layout) => item.navigation.drawer,
  };

  const drawerWidth = {
    type: "string",
    expression: "optional",
    defaultValue: "300px",
    ref: "navigation.drawerWidth",
    translation: "Drawer width",
    show: (item: Layout) => item.navigation.drawer,
  };

  const drawerIcon = {
    label: "Drawer icon",
    component: "expression-with-dropdown",
    dropdownOnly: true,
    type: "string",
    ref: "navigation.drawerIcon",
    defaultValue: "Menu",
    options: ICONS,
    show: (item: Layout) => item.navigation.drawer,
  };

  const drawerIconPosition = {
    translation: "Icon position",
    component: "expression-with-dropdown",
    dropdownOnly: true,
    type: "string",
    ref: "navigation.drawerIconPosition",
    defaultValue: "middleCenter",
    options: [
      { value: "topLeft", label: "Top left" },
      { value: "topCenter", label: "Top center" },
      { value: "topRight", label: "Top right" },
      { value: "middleLeft", label: "Middle left" },
      { value: "middleCenter", label: "Middle center" },
      { value: "middleRight", label: "Middle right" },
      { value: "bottomLeft", label: "Bottom left" },
      { value: "bottomCenter", label: "Bottom center" },
      { value: "bottomRight", label: "Bottom right" },
    ],
    show: (item: Layout) => item.navigation.drawer,
  };

  const title = {
    type: "string",
    expression: "optional",
    defaultValue: "",
    ref: "navigation.title",
    translation: "Title",
  };

  const subTitle = {
    type: "string",
    expression: "optional",
    defaultValue: "",
    ref: "navigation.subTitle",
    translation: "Subtitle",
  };

  const customCss = {
    type: "string",
    expression: "optional",
    defaultValue: "",
    ref: "navigation.customCss",
    translation: "Custom CSS",
  };

  const customCssText = {
    label: `Here you can write any CSS rules. Use "&" as a selector to target this particular element`,
    component: "text",
  };

  const customCssTextExample = {
    label: `Example: & .qv-inner-object {
      border: 2px solid green; border-radius: 20px;
    }`,
    component: "text",
  };

  const definition = {
    type: "items",
    component: "accordion",
    items: {
      navigation,
      settings: {
        component: "expandable-items",
        translation: "Common.Appearance",
        uses: "settings",
        items: {
          header: {
            grouped: true,
            type: "items",
            label: "Header",
            component: "items",
            items: {
              title,
              titleFontSize: {
                type: "string",
                expression: "optional",
                defaultValue: "24px",
                ref: "navigation.titleFontSize",
                translation: "Title font size",
              },
              titleFontBold: {
                type: "boolean",
                component: "switch",
                ref: "navigation.titleFontBold",
                translation: "Title font bold",
                defaultValue: true,
                options: [
                  {
                    value: true,
                    translation: "properties.on",
                  },
                  {
                    value: false,
                    translation: "properties.off",
                  },
                ],
              },
              titleFontColorType: getColorType("titleFontColor", "Title font color"),
              titleFontColor: getColor(
                "titleFontColor",
                "Title font color",
                "#000000",
                true,
                false,
                (item: Layout) => item.navigation.titleFontColorType === "singleColor"
              ),
              titleFontColorExp: getColorExp(
                "titleFontColor",
                "Title font color",
                "#000000",
                false,
                (item: Layout) => item.navigation.titleFontColorType === "byExpression"
              ),
              subTitle,
              subtitleFontSize: {
                type: "string",
                expression: "optional",
                defaultValue: "12px",
                ref: "navigation.subtitleFontSize",
                translation: "Subtitle font size",
              },
              subtitleFontBold: {
                type: "boolean",
                component: "switch",
                ref: "navigation.subtitleFontBold",
                translation: "Subtitle font bold",
                defaultValue: false,
                options: [
                  {
                    value: true,
                    translation: "properties.on",
                  },
                  {
                    value: false,
                    translation: "properties.off",
                  },
                ],
              },
              subtitleFontColorType: getColorType("subtitleFontColor", "Subtitle font color"),
              subtitleFontColor: getColor(
                "subtitleFontColor",
                "Subtitle font color",
                "#000000",
                true,
                false,
                (item: Layout) => item.navigation.subtitleFontColorType === "singleColor"
              ),
              subtitleFontColorExp: getColorExp(
                "subtitleFontColor",
                "Subtitle font color",
                "#000000",
                false,
                (item: Layout) => item.navigation.subtitleFontColorType === "byExpression"
              ),
              headerColorType: getColorType("headerColor", "Header color"),
              headerColor: getColor(
                "headerColor",
                "Header color",
                "#D3D3D3",
                false,
                false,
                (item: Layout) => item.navigation.headerColorType === "singleColor"
              ),
              headerColorExp: getColorExp(
                "headerColor",
                "Header color",
                "#D3D3D3",
                false,
                (item: Layout) => item.navigation.headerColorType === "byExpression"
              ),
            },
          },
          drawer: {
            grouped: true,
            type: "items",
            label: "Drawer",
            component: "items",
            items: {
              drawer,
              drawerLocation,
              drawerWidth,
              drawerIcon,
              drawerIconPosition,
            },
          },
          background: {
            grouped: true,
            type: "items",
            label: "Background",
            component: "items",
            items: {
              backgroundColorType: getColorType("backgroundColor", "Background color"),
              backgroundColor: getColor(
                "backgroundColor",
                "Background color",
                "#FFFFFF",
                false,
                false,
                (item: Layout) => item.navigation.backgroundColorType === "singleColor"
              ),
              backgroundColorExp: getColorExp(
                "backgroundColor",
                "Background color",
                "#FFFFFF",
                false,
                (item: Layout) => item.navigation.backgroundColorType === "byExpression"
              ),
            },
          },
          buttons: {
            grouped: true,
            type: "items",
            label: "Buttons",
            component: "items",
            items: {
              buttonColorType: getColorType("buttonColor", "Button color"),
              buttonColor: getColor(
                "buttonColor",
                "Button color",
                "#FFFFFF",
                false,
                false,
                (item: Layout) => item.navigation.buttonColorType === "singleColor"
              ),
              buttonColorExp: getColorExp(
                "buttonColor",
                "Button color",
                "#FFFFFF",
                false,
                (item: Layout) => item.navigation.buttonColorType === "byExpression"
              ),
              buttonHoverColorType: getColorType("buttonHoverColor", "Button hover color"),
              buttonHoverColor: getColor(
                "buttonHoverColor",
                "Button hover color",
                "#f5f5f5",
                false,
                false,
                (item: Layout) => item.navigation.buttonHoverColorType === "singleColor"
              ),
              buttonHoverColorExp: getColorExp(
                "buttonHoverColor",
                "Button hover color",
                "#f5f5f5",
                false,
                (item: Layout) => item.navigation.buttonHoverColorType === "byExpression"
              ),
            },
          },
          font: {
            grouped: true,
            type: "items",
            label: "Font",
            component: "items",
            items: {
              fontFamily,
              fontSize,
              fontBold: {
                type: "boolean",
                component: "switch",
                ref: "navigation.fontBold",
                translation: "Font bold",
                defaultValue: false,
                options: [
                  {
                    value: true,
                    translation: "properties.on",
                  },
                  {
                    value: false,
                    translation: "properties.off",
                  },
                ],
              },
              fontColorType: getColorType("fontColor", "Font color"),
              fontColor: getColor(
                "fontColor",
                "Font color",
                "#404040",
                true,
                false,
                (item: Layout) => item.navigation.fontColorType === "singleColor"
              ),
              fontColorExp: getColorExp(
                "fontColor",
                "Font color",
                "#404040",
                false,
                (item: Layout) => item.navigation.fontColorType === "byExpression"
              ),
              fontColorOnSheetType: getColorType("fontColorOnSheet", "Font color on active sheet"),
              fontColorOnSheet: getColor(
                "fontColorOnSheet",
                "Font color on active sheet",
                "#00873d",
                true,
                false,
                (item: Layout) => item.navigation.fontColorOnSheetType === "singleColor"
              ),
              fontColorOnSheetExp: getColorExp(
                "fontColorOnSheet",
                "Font color on active sheet",
                "#00873d",
                false,
                (item: Layout) => item.navigation.fontColorOnSheetType === "byExpression"
              ),
            },
          },
          advanced: {
            grouped: true,
            type: "items",
            label: "Advanced",
            component: "items",
            items: {
              customCss,
              customCssText,
              customCssTextExample,
            },
          },
        },
      },
    },
  };

  const support = {
    snapshot: true,
    export: false,
    sharing: false,
    exportData: false,
    viewData: false,
    quickMobile: true,
    showDetails: false,
  };

  return {
    definition,
    importProperties: null,
    exportProperties: null,
    support,
  };
}
