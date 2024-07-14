import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Dashboard.css";
import Hamburgur from "../../icons/Hamburgur";
import Cancle from "../../icons/Cancle";

const Dashboard = () => {
  const [drawer, setDrawer] = useState(true);
  const user = JSON.parse(Cookies.get("user"));
  const dreawerHandler = () => {
    setDrawer(!drawer);
  };
  return (
    <div className="deshboard-page">
      <header className="deshboard-page-header">
        {drawer === true ? (
          <Hamburgur ontap={dreawerHandler} />
        ) : (
          <Cancle ontap={dreawerHandler} />
        )}
        <h2>Dashboard</h2>
        <p>
          {user.isAdmin === "user" ? "Welcome" : "SuperAdmin"}, {user.username}{" "}
        </p>
      </header>
      <div className={drawer === true ? "side-nav" : "side-nav1"}>
        {user.isAdmin === "user" ? (
          <nav className="deshboard-page-nav">
            <Link to="#"> Dummy menu1</Link>
            <Link to="#"> Dummy menu2</Link>
            <Link to="#"> Dummy menu3</Link>
            <Link to="#"> Dummy menu4</Link>
          </nav>
        ) : (
          <nav className="deshboard-page-nav">
            <Link to="/roles">Role Management</Link>
            <Link to="/users">User Management</Link>
            <Link to="/menus">Menu Management</Link>
            <Link to="#"> Dummy menu1</Link>
            <Link to="#"> Dummy menu2</Link>
            <Link to="#"> Dummy menu3</Link>
            <Link to="#"> Dummy menu4</Link>
          </nav>
        )}
      </div>
      <h1>Homepage</h1>
      <footer className="deshboard-footer">footer</footer>
    </div>
  );
};

export default Dashboard;
