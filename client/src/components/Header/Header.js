import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="page-header">
    <div className="page-header__logo-container">
      <Link to="/" className="logo-link"><h1 className="logo-container__logo">Suggestionem</h1></Link>
    </div>
    <nav className="page-header__navbar">
      <ul className="page-header__navbar-list">
        <NavLink to="/" className="page-header__navbar-item" activeclassname="active">Home</NavLink>
        <NavLink to="/search" className="page-header__navbar-item" activeclassname="active">Search</NavLink>
        <NavLink to="/suggestions" className="page-header__navbar-item" activeclassname="active">Music</NavLink>
      </ul>
    </nav>
  </header>
);

export default Header;
