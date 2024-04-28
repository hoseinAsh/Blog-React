import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg p-3">
      <h1 className="navbar-brand text-light">Post Project</h1>
      
      <nav className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="post">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="user">Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
