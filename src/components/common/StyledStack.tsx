import { Stack, Typography } from "@mui/material";
import type { stardust } from "@nebula.js/stardust";
import type { MutableRefObject, ReactNode, ReactElement } from "react";
import React, { useEffect, useRef, useState, isValidElement, cloneElement, Children } from "react";
import type { InputChild } from "../../types";
import { getComponentTypes } from "../../utils/helper";
const { ignoreSizeComponents } = getComponentTypes();

export interface StyledStackProps {
  props: InputChild;
  children: ReactNode;
  rect: stardust.Rect;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
}

const StyledStack = ({ props, children, innerRef, rect }: StyledStackProps) => {
  const { component, direction, autoHeight, height, autoWidth, width, verticalAlignment, horizontalAlignment, title } =
    props;
  const [size, setSize] = useState({ height: 0, width: 0 });
  const titleRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (stackRef.current) {
      const heightOffset = titleRef.current ? titleRef.current.offsetHeight : 0;
      const widthOffset = titleRef.current ? titleRef.current.offsetWidth : 0;
      setSize({
        height: stackRef.current.offsetHeight - heightOffset,
        width: stackRef.current.offsetWidth - widthOffset,
      });
    }
  }, [title, rect?.width, rect?.height]);

  return (
    <Stack
      ref={innerRef}
      sx={{ height: "100%", width: "100%" }}
      alignItems={horizontalAlignment}
      justifyContent={verticalAlignment}
    >
      {title === "" ? null : <Typography>{title}</Typography>}
      <Stack
        sx={{
          maxHeight: "100%",
          display: "flex",
          ...(autoHeight || ignoreSizeComponents.includes(component) ? {} : {height: `${height}%`}),
          width: autoWidth || ignoreSizeComponents.includes(component) ? "100%" : `${width}%`,
        }}
        direction={ignoreSizeComponents.includes(component) ? "column" : direction}
        gap={0.5}
        alignItems={horizontalAlignment}
        justifyContent={verticalAlignment}
      >
        {children}
      </Stack>
    </Stack>
  );
};
export default StyledStack;
