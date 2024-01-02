import { Typography, Box } from "@mui/material";
import { stardust } from "@nebula.js/stardust";
import React, { useEffect } from "react";
import type { Models, NavigationProps, Color } from "../types";
import NavigationComponent from "./NavigationComponent";

export interface InitComponentProps {
  models: Models;
  translator: stardust.Translator;
  senseNavigation: any;
}


const getColor = (props: NavigationProps, ref: keyof NavigationProps): string => {
  const typeKey = `${ref}Type` as keyof NavigationProps;
  const singleColor = props[typeKey] === "singleColor";
  return singleColor ? (props[ref] as Color).color : (props[`${ref}Exp` as keyof NavigationProps] as string);
};

const InitComponent = ({ models, translator, senseNavigation }: InitComponentProps) => {
  const { app, layout, interactions, theme } = models;
  const editMode = interactions.edit;

  const backgroundElement = models.element.firstElementChild;
  backgroundElement?.setAttribute("style", `background-color:${getColor(layout.navigation, "backgroundColor") || "#FFFFFF"}`);
  const contextMenu = models.element?.querySelector(".ignore-context-menu");
  contextMenu?.setAttribute("style", "display: none !important");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = layout.navigation.customCss.replace(/&/g, `div[tid="${layout.qInfo.qId}"]`);
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [layout.navigation.customCss]);

  return (
    <Box sx={{height: "100%"}} position="relative">
      {editMode && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex="tooltip"
          sx={{ pointerEvents: 'auto' }}
        />
      )}
      {app && layout?.qInfo?.qId ? (
        layout.categories.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
            <Typography variant="subtitle1">No categories added</Typography>
          </Box>
        ) : (
          <NavigationComponent
            theme={theme}
            id={layout.qInfo.qId}
            app={app}
            categories={layout.categories}
            senseNavigation={senseNavigation}
            props={layout.navigation}
          />
        )
      ) : null}
    </Box>
  );
};

export default InitComponent;
