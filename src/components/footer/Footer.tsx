import React from 'react';
import './Footer.scss';

const Footer = (): JSX.Element => (
  <div className="Footer">
    <img src={process.env.PUBLIC_URL + '/img/jm_logo.png'} title="Javier Moran" />
    <i className="fab fa-react Footer__icon" title="React + Redux"></i>
    <i className="fab fa-sass Footer__icon" title="Sass"></i>
    <i className="fab fa-node-js Footer__icon" title="NodeJs"></i>
  </div>
);

export default Footer;