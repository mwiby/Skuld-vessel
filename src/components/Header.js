import React from "react";
import "./Header.css";

const Header = ({ callSetQuery, query }) => {
  return (
    <header className="header-menu">
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Search</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={query}
          onChange={callSetQuery}
        />
      </div>
    </header>
  );
};

export default Header;
