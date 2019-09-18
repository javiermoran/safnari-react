import React, { useContext } from "react";
import { Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "../../context";

export const DrawerButton = () => {
  const appContext = useContext(AppContext);
  const handleClick = () => {
    appContext.setDrawerOpen(true);
  }
  return (
    <Hidden smUp implementation="css">
      <IconButton className="DrawerButton" edge="start" onClick={handleClick}>
        <MenuIcon className="DrawerButton__hamburger" />
      </IconButton>
    </Hidden>
  );
};
