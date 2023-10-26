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

const generateCategorySchema = (maxDepth: number, currentDepth: number = 0): CategorySchema => {
  if (currentDepth >= maxDepth) return {};
  return {
    type: "array",
    ref: "categories",
    label: "Categories",
    itemTitleRef: "label",
    allowAdd: true,
    allowRemove: true,
    addTranslation: "Add category",
    items: {
      label: {
        type: "string",
        ref: "label",
        label: "Label",
        expression: "optional",
      },
      showIcon: {
        type: 'boolean',
        component: 'switch',
        ref: 'showIcon',
        label: 'Show icon',
        defaultValue: false,
        options: [
          {
            value: true,
            translation: 'properties.on',
          },
          {
            value: false,
            translation: 'properties.off',
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
        type: 'boolean',
        component: 'switch',
        ref: 'showDivider',
        label: 'Show divider',
        defaultValue: false,
        options: [
          {
            value: true,
            translation: 'properties.on',
          },
          {
            value: false,
            translation: 'properties.off',
          },
        ],
      },
      showNavigation: {
        type: 'boolean',
        component: 'switch',
        ref: 'showNavigation',
        label: 'Navigate',
        defaultValue: false,
        options: [
          {
            value: true,
            translation: 'properties.on',
          },
          {
            value: false,
            translation: 'properties.off',
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
        show: (item: Category) => item.showNavigation
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
        show: (item: Category) => (item.navigation === "goToApp" || item.navigation === "goToSheetById") && item.showNavigation,
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
        show: (item: Category) => (item.navigation === "goToApp" || item.navigation === "goToWebsite") && item.showNavigation,
        defaultValue: true,
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

const buttonColor = {
  component: "color-picker",
  type: "object",
  ref: "navigation.buttonColor",
  translation: "Button color",
  disableNone: false,
  dualOutput: true,
  defaultValue: {
    color: "#FFFFFF",
    index: "-1",
  },
};

const buttonHoverColor = {
  component: "color-picker",
  type: "object",
  ref: "navigation.buttonHoverColor",
  translation: "Button hover color",
  disableNone: false,
  dualOutput: true,
  defaultValue: {
    color: "#f5f5f5",
    index: "-1",
  },
};

const fontColor = {
  component: "color-picker",
  type: "object",
  ref: "navigation.fontColor",
  translation: "Font color",
  dualOutput: true,
  defaultValue: {
    color: "#404040",
    index: "-1",
  },
};

const fontColorOnSheet = {
  component: "color-picker",
  type: "object",
  ref: "navigation.fontColorOnSheet",
  translation: "Font color for active sheet",
  dualOutput: true,
  defaultValue: {
    color: "#00873d",
    index: "-1",
  },
};

const backgroundColor = {
  component: "color-picker",
  type: "object",
  ref: "navigation.backgroundColor",
  translation: "properties.background.options",
  disableNone: false,
  dualOutput: true,
  defaultValue: {
    color: "#FFFFFF",
    index: "-1",
  },
};

const drawer = {
  type: 'boolean',
  component: 'switch',
  ref: 'navigation.drawer',
  label: 'Drawer',
  defaultValue: false,
  options: [
    {
      value: true,
      translation: 'properties.on',
    },
    {
      value: false,
      translation: 'properties.off',
    },
  ],
}

/* const orientation = {
  label: "Orientation",
  component: "expression-with-dropdown",
  dropdownOnly: true,
  type: "string",
  ref: "navigation.orientation",
  defaultValue: "top",
  options: [
    { value: "top", label: "Top" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "bottom", label: "Bottom" },
  ],
};

const horizontalAlignment = {
  label: "Horizontal alignment",
  component: "expression-with-dropdown",
  dropdownOnly: true,
  type: "string",
  ref: "navigation.horizontalAlignment",
  defaultValue: "center",
  options: [
    { value: "flex-start", label: "Align left" },
    { value: "flex-end", label: "Align right" },
    { value: "center", label: "Center" },
    { value: "space-between", label: "Space between" },
    { value: "space-evenly", label: "Space evenly" },
    { value: "space-around", label: "Space around" },
  ],
};

const verticalAlignment = {
  label: "Vertical alignment",
  component: "expression-with-dropdown",
  dropdownOnly: true,
  type: "string",
  ref: "navigation.verticalAlignment",
  defaultValue: "flex-start",
  options: [
    { value: "flex-start", label: "Align top" },
    { value: "flex-end", label: "Aligm bottom" },
    { value: "center", label: "Center" },
    { value: "space-between", label: "Space between" },
    { value: "space-evenly", label: "Space evenly" },
    { value: "space-around", label: "Space around" },
  ],
}; */

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
}

const drawerIcon = {
  label: "Drawer icon",
  component: "expression-with-dropdown",
  dropdownOnly: true,
  type: "string",
  ref: "navigation.drawerIcon",
  defaultValue: "Menu",
  options: ICONS,
  show: (item: Layout) => item.navigation.drawer,
}

const drawerIconPosition = {
  label: "Orientation",
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
    { value: "middleCenter", label: "Middle right" },
    { value: "bottomLeft", label: "Bottom left" },
    { value: "bottomCenter", label: "Bottom center" },
    { value: "bottomRight", label: "Bottom right" },
  ],
  show: (item: Layout) => item.navigation.drawer,
};

const style = {
  type: "items",
  label: "Style",
  component: "items",
  items: {
    drawer,
    drawerLocation,
    drawerWidth,
    drawerIcon,
    drawerIconPosition,
    backgroundColor,
    buttonColor,
    buttonHoverColor,
    fontColor,
    fontColorOnSheet,
  },
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
        style,
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

export default function ext(_galaxy: unknown) {
  return {
    definition,
    importProperties: null,
    exportProperties: null,
    support,
  };
}
