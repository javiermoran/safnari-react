import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import api from "../../safnari.api";
import "./Header.scss";

class Header extends React.Component {
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
  onLogout = e => {
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
        {this.props.alerts.map(alert => (
          <div className={`alert ${alert.type}`} key={alert.id}>
            {alert.message}
          </div>
        ))}
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start">
              <MenuIcon />
            </IconButton>
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

const mapStateToProps = state => ({
  user: state.user,
  alerts: state.alerts
});

export default connect(mapStateToProps)(withRouter(Header));
