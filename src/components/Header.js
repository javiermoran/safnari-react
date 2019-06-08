import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import api from '../safnari.api';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  loggedInMenu = () => {
    return (
      <ul className="nav">
        <a
          className="nav-link"
          href="#"
          onClick={this.onLogout}
        >
          Logout
        </a>
      </ul>
    )
  };
  loggedOutMenu = () => {
    return (
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="login" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="register" activeClassName="active">
            Register
          </NavLink>
        </li>
      </ul>
    );
  };
  onLogout = (e) => {
    const { history } = this.props;
    e.preventDefault();
    api.users.logout().then(() => {
      this.props.dispatch({ type: 'LOGGED_OUT' });
      history.push('/login');
    });
  }
  render() {
    return (
      <div className="Header">
        { this.props.user.loggedIn ? this.loggedInMenu() : this.loggedOutMenu() }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(Header));
