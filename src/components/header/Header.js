import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="Header">
    <ul class="nav">
      <li class="nav-item">
        <NavLink className="nav-link" to="login" activeClassName="active">Login</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="register" activeClassName="active">Register</NavLink>
      </li>
    </ul>
  </div>
);

export default Header;
