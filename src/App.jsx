import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/LoginPage/Login";
import Signup from "./component/SignupPage/Signup";
import Dashboard from "./component/DashBoard/Dashboard";
import RoleManagement from "./component/RoleManagementPage/RoleManagement";
import UserManagement from "./component/UserManagment/UserManagement";
import MenuManagement from "./component/MenuManagementPage/MenuManagement";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/menus" element={<MenuManagement />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
