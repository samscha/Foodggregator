import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = _ => {
  return (
    <NavLink to="/" className="Header">
      Foodggregator
    </NavLink>
  );
};

export default Header;
