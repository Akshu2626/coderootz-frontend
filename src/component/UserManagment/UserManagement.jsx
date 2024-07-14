import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import "./Usermanagment.css";

const UserManagement = () => {
  const token = Cookies.get("token");
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await fetch(
          "https://coodrootz-be.onrender.com/api/users/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await responseUsers.json();
        setUserData(userData);

        const responseRoles = await fetch(
          "https://coodrootz-be.onrender.com/api/roles/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const rolesData = await responseRoles.json();
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Error fetching data", { variant: "error" });
      }
    };
    fetchData();
  }, [token, enqueueSnackbar]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const adminHandler = async (id) => {
    try {
      const response = await fetch(
        "https://coodrootz-be.onrender.com/api/roles/updateRole",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isAdmin: "Admin",
            userId: id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      setUserData((prevData) =>
        prevData.map((user) =>
          user._id === id ? { ...user, isAdmin: "Admin" } : user
        )
      );

      enqueueSnackbar("Role updated to Admin successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error updating role to Admin", { variant: "error" });
    }
  };

  const userHandler = async (id) => {
    try {
      const response = await fetch(
        "https://coodrootz-be.onrender.com/api/roles/updateRole",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isAdmin: "user",
            userId: id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      setUserData((prevData) =>
        prevData.map((user) =>
          user._id === id ? { ...user, isAdmin: "user" } : user
        )
      );

      enqueueSnackbar("Role updated to User successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error updating role to User", { variant: "error" });
    }
  };

  const assignRoleHandler = async (user) => {
    console.log(user, selectedUser);
    try {
      const respo = await fetch(
        "https://coodrootz-be.onrender.com/api/users/assign-role",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user._id,
            roleId: user.roleId,
          }),
        }
      );
      const data = await respo.json();
      console.log(data);

      setUserData((prevData) =>
        prevData.map((u) =>
          u._id === user._id ? { ...u, roleId: user.roleId } : u
        )
      );

      enqueueSnackbar("Role assigned successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error assigning role", { variant: "error" });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-management-page">
      <h2>User Management</h2>
      <form onSubmit={submitHandler} className="user-management-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={selectedUser ? selectedUser.username : ""}
            readOnly
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={selectedUser ? selectedUser.email : ""}
            readOnly
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={selectedUser ? selectedUser.roleId : ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, roleId: e.target.value })
            }
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={() => assignRoleHandler(selectedUser)}>
          Assign Role
        </button>
      </form>
      <h3>Existing Users:</h3>
      <ul className="user-management-users">
        {userData.map((user) => (
          <li
            key={user._id}
            onClick={() => handleUserClick(user)}
            className="user-management-li"
          >
            <h5>
              {user.isAdmin} : {user.username}
            </h5>
            {user.isAdmin === "user" ? (
              <button
                onClick={() => {
                  adminHandler(user._id);
                }}
              >
                Make Admin
              </button>
            ) : (
              <button
                onClick={() => {
                  userHandler(user._id);
                }}
              >
                Make User
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
