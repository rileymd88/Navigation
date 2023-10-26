import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useOptions } from "@nebula.js/stardust";
import React from "react";
import type { Root } from "react-dom/client";
import InitComponent, { type InitComponentProps } from "../components/InitComponent";
import muiSetup from "../components/mui-setup";
import type { UseOptions } from "../types";

interface Props extends InitComponentProps {
  element: Root | undefined;
  senseNavigation: any;
}
const useInitComponent = ({ element, translator, models, senseNavigation }: Props) => {
  const { layout, rect } = models;
  const options = useOptions() as UseOptions;
  const muiTheme = muiSetup(options.direction);
  useEffect(() => {
    element?.render(
      <ThemeProvider theme={muiTheme}>
        <InitComponent models={models} translator={translator} senseNavigation={senseNavigation} />
      </ThemeProvider>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, layout, rect.height, rect.width, models]);
};

export default useInitComponent;