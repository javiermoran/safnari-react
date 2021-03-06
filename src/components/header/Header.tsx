import React, { FormEvent, Dispatch } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import api from "../../safnari.api";
import { History } from 'history';
import { IAlert } from "../../models/IAlert";
import { DrawerButton } from "./DrawerButton";
import "./Header.scss";

interface IHeaderProps {
  alerts: IAlert[];
  user: { loggedIn: boolean, darkMode: boolean, username: string };
  dispatch: Dispatch<any>;
  history: History;
};

const Header = (props: any) => {
  const loggedInMenu = () => {
    return (
      <div>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </div>
    );
  };
  const loggedOutMenu = () => {
    return (
      <div className="sign-up-menu">
        <NavLink
          className="sign-up-menu__link"
          to="/login"
          activeClassName="sign-up-menu__link--active"
        >
          <Button color="inherit">Sign in</Button>
        </NavLink>
        <NavLink
          className="sign-up-menu__link"
          to="/register"
          activeClassName="sign-up-menu__link--active"
        >
          <Button color="inherit">Sign up</Button>
        </NavLink>
      </div>
    );
  };
  const onLogout = (e: FormEvent<any>) => {
    const { history } = props;
    e.preventDefault();
    api.users.logout().then(() => {
      props.dispatch({ type: "LOGGED_OUT" });
      history.push("/login");
    });
  };
  return (
    <div className="Header">
      <div className="alerts-container">
        {props.alerts.map((alert: IAlert) => (
          <div className={`alert ${alert.type}`} key={alert.id}>
            {alert.message}
          </div>
        ))}
      </div>
      <AppBar position="fixed">
        <Toolbar>
          <DrawerButton />
          <Typography variant="h6" className="Header__title title flex-grow-1">
            Safnari
          </Typography>
          {props.user.loggedIn ? loggedInMenu() : loggedOutMenu()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  alerts: state.alerts
});

export default connect(mapStateToProps)(Header);
