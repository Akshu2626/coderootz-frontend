import React from "react";
import "./MenuManagement.css";

const MenuManagement = () => {
  return (
    <div className="menu-management-page">
      <h2>Menu Management</h2>
      <form className="menu-management-form">
        <div>
          <label>Menu Name:</label>
          <input type="text" />
        </div>
        <div>
          <label>Icon URL:</label>
          <input type="text" />
        </div>
        <button type="submit">Create Menu</button>
      </form>
      <h3>Existing Menus:</h3>
      <ul className="menu-management-list">
        <li>
          Dashboard:
          <span style={{ backgroundImage: "url(/path/to/icon1.png)" }}></span>
        </li>
      </ul>
    </div>
  );
};

export default MenuManagement;
