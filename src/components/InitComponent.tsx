import { stardust } from "@nebula.js/stardust";
import React from 'react';
import type { Models } from "../types";
import { Container } from "./common/styled";
import Navigation from "./Navigation";
import NavigationComponent from "./NavigationComponent";

export interface InitComponentProps {
  models: Models;
  translator: stardust.Translator;
  senseNavigation: any;
}

const InitComponent = ({ models, translator, senseNavigation }: InitComponentProps) => {
  const { app, layout, interactions, theme } = models;
  const editMode = interactions.edit;
  const backgroundElement = models.element.firstElementChild;
  backgroundElement?.setAttribute("style", `background-color:${layout.navigation.backgroundColor?.color || "#FFFFFF" }`);

  return (
    app &&
    layout?.qInfo?.qId && (
        <NavigationComponent theme={theme} id={layout.qInfo.qId} app={app} categories={layout.categories} senseNavigation={senseNavigation} props={layout.navigation} />
    )
  );
};

export default InitComponent;
