import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { stardust } from "@nebula.js/stardust";
import * as Icons from "@qlik-trial/sprout/icons/react";
import React, { useEffect, useRef, useState } from "react";
import { type Category, type NavigationProps, type Position } from "../types";
import { encodeUrl, getCurrentProtocol, inIframe, removeProtocolHttp, urlHasEmailProtocol } from "../utils/urlUtils";

interface NavigationComponentProps {
  app: EngineAPI.IApp;
  categories: Category[];
  senseNavigation: any;
  props: NavigationProps;
  id: string;
  theme: stardust.Theme;
}

const NavigationComponent = ({ app, categories, senseNavigation, props, id, theme }: NavigationComponentProps) => {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [currentSheetId, setCurrentSheetId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const storageKey = `sn-navigation-${(app as any).id}-${id}.collapsed`;
  const grid = document.querySelector(`#grid`) as HTMLElement;
  const gridPosition = grid?.getBoundingClientRect() || null;
  const top = grid && gridPosition ? `${gridPosition.top - grid.offsetTop}px` : "auto";

  useEffect(() => {
    const storedState = localStorage.getItem(storageKey);
    if (storedState) {
      setCollapsed(JSON.parse(storedState));
    }
    const fetchCurrentSheetId = async () => {
      const sheetId = await senseNavigation.getCurrentSheetId();
      setCurrentSheetId(sheetId);
    };
    fetchCurrentSheetId();
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(collapsed));
  }, [collapsed]);

  const handleExpandClick = (category: Category) => {
    handleActions(category);
    if (category.categories.length > 0) {
      const index = collapsed.findIndex((c) => c === category.cId);
      if (index > -1) {
        const newCollapsed = [...collapsed];
        newCollapsed.splice(index, 1);
        setCollapsed(newCollapsed);
      } else {
        setCollapsed([...collapsed, category.cId]);
      }
    }
  };

  const handleActions = async (category: Category) => {
    if (category.showNavigation) {
      switch (category.navigation) {
        case "goToSheet": {
          await senseNavigation.goToSheet(category.sheet, "");
          break;
        }
        case "goToApp": {
          const tempBookmark = (app as any).storeTempSelectionState && (await (app as any).storeTempSelectionState());
          let target = "";
          if (category.sameWindow) {
            target = inIframe() ? "_parent" : "_self";
          }
          const url = `../sense/app/${encodeURIComponent(category.appId)}/sheet/${encodeURIComponent(
            category.sheetId
          )}/tempselectionstate/${encodeURIComponent(tempBookmark)}`;
          window.open(url, target);
          break;
        }
        case "goToWebsite": {
          try {
            if (category.websiteUrl) {
              const protocol = getCurrentProtocol(category.websiteUrl);
              const url = removeProtocolHttp(category.websiteUrl);
              const isEmail = urlHasEmailProtocol(url);
              let target = "";
              if (isEmail) {
                window.open(url, target);
              }
              if (category.sameWindow) {
                target = inIframe() ? "_parent" : "_self";
                window.open(`${protocol}${url}`, target);
              }
              if (!isEmail && !category.sameWindow) {
                const encoded = encodeUrl(url);
                window.open(`${protocol}${encoded}`, target);
              }
            }
          } catch (error) {
            // no-op
          }
          break;
        }
        case "goToSheetById": {
          await senseNavigation.goToSheet(category.sheetId, "");
          break;
        }
      }
    }
  };

  const loadIcon = (iconName: string) => {
    if (iconName === "None") {
      return null;
    }
    const NestedObject = (Icons as any)[iconName] as unknown as { default: React.ComponentType };
    if (NestedObject && NestedObject.default) {
      return React.createElement(NestedObject.default);
    } else {
      console.error(`Icon ${iconName} not found`);
      return null;
    }
  };

  const renderCategory = (category: Category, level: number = 0) => {
    let onCurrentSheet = false;
    if (category.showNavigation && (category.navigation === "goToSheet" || category.navigation === "goToSheetById")) {
      const navigationSheetId = category.navigation === "goToSheet" ? category.sheet : category.sheetId;
      onCurrentSheet = currentSheetId === navigationSheetId;
    }

    return (
      <div>
        <ListItemButton
          sx={{ pl: Math.max(4 * level, 1.5), pr: 1.5, pt: 1.5, pb: 1.5, backgroundColor: props.buttonColor.color }}
          key={category.cId}
          onClick={() => handleExpandClick(category)}
        >
          {category.showIcon ? <ListItemIcon sx={{ pl: 1 }}>{loadIcon(category.icon)}</ListItemIcon> : null}
          <ListItemText
            primaryTypographyProps={{
              style: { color: onCurrentSheet ? props.fontColorOnSheet.color : props.fontColor.color },
            }}
            primary={category.label}
          />
          {(category.categories?.length ?? 0) > 0 ? (
            collapsed.includes(category.cId) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItemButton>
        {category.showDivider ? <Divider sx={{width: "95%", ml: "2.5%"}} /> : null}
        {collapsed.includes(category.cId) && (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.categories.map((subCat) => renderCategory(subCat, level + 1))}
            </List>
          </Collapse>
        )}
      </div>
    );
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getDrawerIconPosition = (drawerLocation: Position) => {
    const mapping = {
      topLeft: { justifyContent: "flex-start", alignItems: "flex-start" },
      topCenter: { justifyContent: "center", alignItems: "flex-start" },
      topRight: { justifyContent: "flex-end", alignItems: "flex-start" },
      middleLeft: { justifyContent: "flex-start", alignItems: "center" },
      middleCenter: { justifyContent: "center", alignItems: "center" },
      middleRight: { justifyContent: "flex-end", alignItems: "center" },
      bottomLeft: { justifyContent: "flex-start", alignItems: "flex-end" },
      bottomCenter: { justifyContent: "center", alignItems: "flex-end" },
      bottomRight: { justifyContent: "flex-end", alignItems: "flex-end" },
    };
    return mapping[drawerLocation] || {};
  };

  const list = (
    <List sx={{ width: "100%", height: "100%", bgcolor: props.backgroundColor.color }} component="nav">
      {categories.map((category: Category) => renderCategory(category))}
    </List>
  );

  return (
    <>
      {props.drawer ? (
        <Box sx={{ 
            ...(props.drawer ? getDrawerIconPosition(props.drawerIconPosition) : {}), 
            display: "flex", 
            height: "100%", 
            width: "100%" 
          }}>
          <IconButton
            sx={{margin: 0}}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            {loadIcon(props.drawerIcon)}
          </IconButton>
          <Drawer
            anchor={props.drawerLocation}
            open={drawerOpen}
            onClose={toggleDrawer}
            PaperProps={{
              sx: {
                width: props.drawerWidth,
                top,
                height: "100%",
              },
            }}
            ModalProps={{
              BackdropProps: {
                sx: {
                  top,
                  height: "100%",
                },
              },
            }}
          >
            {list}
          </Drawer>
        </Box>
      ) : (
        list
      )}
    </>
  );
      
}

export default NavigationComponent;
