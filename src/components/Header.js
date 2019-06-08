import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="Header">
    <ul className="nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="login" activeClassName="active">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="register" activeClassName="active">Register</NavLink>
      </li>
    </ul>
  </div>
);

export default Header;
