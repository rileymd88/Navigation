import { stardust } from "@nebula.js/stardust";
import type { EventEmitter } from "node:events";

export type Category = {
  label: string;
  navigateToSheet: boolean;
  sheet: string;
  subCategory: boolean;
  showNavigation: boolean;
  navigation: "goToSheet" | "goToApp" | "goToWebsite" | "goToSheetById";
  appId: string;
  sameWindow: boolean;
  sheetId: string;
  websiteUrl: string;
  categories: Category[];
  showIcon: boolean;
  showDivider: boolean;
  icon: string;
  showHide: string;
  cId: string;
};

export type Position =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "middleLeft"
  | "middleCenter"
  | "middleCenter"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

export type Color = {
  color: string;
}

export type NavigationProps = {
  orientation: "left" | "right" | "top" | "bottom";
  horizontalAlignment: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  verticalAlignment: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  drawer: boolean;
  drawerLocation: "left" | "right";
  drawerWidth: string;
  drawerIcon: string;
  drawerIconPosition: Position;
  buttonColor: Color;
  buttonHoverColor: Color;
  fontFamily: string;
  fontSize: string;
  fontColor: Color;
  fontColorOnSheet: Color;
  backgroundColor: Color;
};

export interface Layout extends EngineAPI.IGenericObjectLayout {
  categories: Category[];
  navigation: NavigationProps;
}

export interface Models {
  element: HTMLElement;
  app?: EngineAPI.IApp;
  layout: Layout;
  model?: EngineAPI.IGenericObject;
  embed: stardust.Embed;
  emitter: EventEmitter;
  interactions: stardust.Interactions;
  rect: stardust.Rect;
  theme: stardust.Theme;
}

export interface ComponentProps {
  props: Layout;
  app: EngineAPI.IApp | undefined;
  rect: stardust.Rect;
}
