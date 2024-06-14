// Navigation.js

import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_MIGRATE, ROUTE_SEARCH } from "../routes";

const Navigation = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to={ROUTE_MIGRATE}>Migrate Data</Link>
        <Link to={ROUTE_SEARCH}>Search Data</Link>
      </div>
    </div>
  );
};

export default Navigation;
