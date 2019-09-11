import React, { FormEvent, Dispatch } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, IconButton, Typography, Button, Hidden } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import api from "../../safnari.api";
import { History } from 'history';
import { IAlert } from "../../models/IAlert";
import "./Header.scss";

interface IHeaderProps extends RouteComponentProps {
  alerts: IAlert[];
  user: { loggedIn: boolean, darkMode: boolean, username: string };
  dispatch: Dispatch<any>;
  history: History;
};

class Header extends React.Component<IHeaderProps> {
  loggedInMenu = () => {
    return (
      <div>
        <Button color="inherit" onClick={this.onLogout}>
          Logout
        </Button>
      </div>
    );
  };
  loggedOutMenu = () => {
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
  onLogout = (e: FormEvent<any>) => {
    const { history } = this.props;
    e.preventDefault();
    api.users.logout().then(() => {
      this.props.dispatch({ type: "LOGGED_OUT" });
      history.push("/login");
    });
  };
  render() {
    return (
      <div className="Header">
        {this.props.alerts.map((alert: IAlert) => (
          <div className={`alert ${alert.type}`} key={alert.id}>
            {alert.message}
          </div>
        ))}
        <AppBar position="fixed">
          <Toolbar>
            <Hidden smUp implementation="css">
              <IconButton edge="start">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="h6" className="title flex-grow-1">
              Safnari
            </Typography>
            {this.props.user.loggedIn ? this.loggedInMenu() : this.loggedOutMenu()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  alerts: state.alerts
});

export default connect(mapStateToProps)(withRouter(Header));
