import { Box, Button, Menu, MenuItem, type PopoverOrigin } from "@mui/material";
import React, { useState } from "react";
import { type Category, type NavigationProps } from "../types";
interface NavigationComponentProps {
  categories: Category[];
  senseNavigation: any;
  props: NavigationProps;
}
const Navigation = ({ categories, senseNavigation, props }: NavigationComponentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleNavigation = (sheetId: string) => {
    senseNavigation.goToSheet(sheetId);
    handleClose();
  };

  const calcAnchorOrigin = (): PopoverOrigin => {
    switch (props.orientation) {
      case "left":
        return { vertical: "bottom", horizontal: "right" };
      case "right":
        return { vertical: "bottom", horizontal: "left" };
      case "top":
        return { vertical: "bottom", horizontal: "center" };
      case "bottom":
        return { vertical: "top", horizontal: "center" };
      default:
        return { vertical: "bottom", horizontal: "center" };
    }
  };

  const calcTransformOrigin = (): PopoverOrigin => {
    switch (props.orientation) {
      case "left":
        return { vertical: "top", horizontal: "left" };
      case "right":
        return { vertical: "top", horizontal: "right" };
      case "top":
        return { vertical: "top", horizontal: "center" };
      case "bottom":
        return { vertical: "bottom", horizontal: "center" };
      default:
        return { vertical: "top", horizontal: "center" };
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        gap: 1,
        flexDirection: props.orientation === "top" || props.orientation === "bottom" ? "row" : "column",
        justifyContent:
          props.orientation === "top" || props.orientation === "bottom"
            ? props.horizontalAlignment
            : props.verticalAlignment,
        alignItems:
          props.orientation === "top" || props.orientation === "bottom"
            ? props.verticalAlignment
            : props.horizontalAlignment,
      }}
    >
      {categories.map((category, index) => (
        <>
          <Button
            variant="text"
            sx={{
              cursor: category.navigateToSheet ? "pointer" : "inherit",
              backgroundColor: props.buttonColor.color,
              color: props.fontColor.color,
              "&:hover": {
                backgroundColor: props.buttonHoverColor.color,
                color: props.fontColor.color,
              },
            }}
            aria-owns={anchorEl ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onMouseOver={(e) => handleClick(e, index)}
            onClick={category.navigateToSheet ? () => handleNavigation(category.sheet) : undefined}
          >
            {category.label}
          </Button>
          {category.categories.length > 0 ? (
            <Menu
              id="menu-list-grow"
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedIndex === index}
              onClose={handleClose}
              anchorOrigin={calcAnchorOrigin()}
              transformOrigin={calcTransformOrigin()}
              MenuListProps={{
                onMouseLeave: () => {
                  handleClose();
                },
              }}
            >
              {category.categories.map((subCategory: Category) => (
                <MenuItem key={subCategory.label} onClick={() => handleNavigation(subCategory.sheet)}>
                  {subCategory.label}
                </MenuItem>
              ))}
            </Menu>
          ) : null}
        </>
      ))}
    </Box>
  );
};

export default Navigation;