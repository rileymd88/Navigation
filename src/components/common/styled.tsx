import styled from "@emotion/styled";
import { Box, Button, Divider, List, ListItemIcon, SvgIcon } from "@mui/material";
import React from "react";

const SPROUT_TYPOGRAPHY_COLOR = "rgb(89, 89, 89)";

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
});

export const StyledList = styled(List)({
  "&.MuiList-root": {
    paddingTop: 0,
    paddingBottom: 0,
    width: 250,
    maxHeight: 250,
  },
});

export const StyledListItemIcon = styled(ListItemIcon)({
  "&.MuiListItemIcon-root": {
    minWidth: 32,
  },
});

export const GroupDivider = styled(Divider)({
  "&.MuiDivider-root": {
    borderBottom: "3px solid #595959",
  },
});

export const StyledButton = styled(Button)({
  minWidth: "5px",
  minHeight: "5px",
  padding: 0,
  "&.MuiButton-contained": {
    backgroundColor: SPROUT_TYPOGRAPHY_COLOR,
    color: "rgb(255, 255, 255)",
  },
  "&.MuiButton-outlined": {
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: SPROUT_TYPOGRAPHY_COLOR,
    color: SPROUT_TYPOGRAPHY_COLOR,
    border: "1px solid rgb(179, 179, 179)",
    "&:hover": {
      backgroundColor: "rgb(255, 255, 255)",
      border: `1px solid ${SPROUT_TYPOGRAPHY_COLOR}`,
    },
  },
});

export const SvgIconMedium = styled(SvgIcon)({
  width: "1em",
  height: "1em",
  paddingBottom: "8px",
});

export const SvgIconSmall = styled(SvgIcon)({
  width: "16px",
  height: "16px",
});

export const BoxIcon = () => (
  <SvgIconMedium viewBox="0 0 16 16">
    <path d="m8 0 7 4-7 4-7-4 7-4Zm1 16v-6l6-3.5V13l-6 3Zm-8-3V6.5L7.1 10v6L1 13Z" />
  </SvgIconMedium>
);