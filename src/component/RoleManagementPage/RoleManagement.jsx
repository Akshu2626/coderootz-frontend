import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Popup from "../Popup/Popup";
import "./RoleManagement.css";

const RoleManagement = () => {
  const token = Cookies.get("token");
  const { enqueueSnackbar } = useSnackbar();
  const [roleName, setRoleName] = useState("");
  const [menus, setMenus] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleCreated, setRoleCreated] = useState(false);
  const navigate = useNavigate();
  const [popupbox, setPopupbox] = useState(false);
  const [update, setUpdate] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    await createRole();
  };

  const createRole = async () => {
    try {
      const res = await fetch("https://coodrootz-be.onrender.com/api/roles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: roleName, menus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create role");
      }

      const data = await res.json();
      setRoleCreated(true);
      setRoles((prevRoles) => [...prevRoles, data]);
      Cookies.set("roles", JSON.stringify(roles), { expires: 7 });
      enqueueSnackbar("Role created successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error creating role", { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://coodrootz-be.onrender.com/api/roles/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Error fetching roles", { variant: "error" });
      }
    };

    fetchData();
  }, [roleCreated, token, popupbox, enqueueSnackbar]);

  useEffect(() => {
    if (roleCreated) {
      setRoleCreated(false);
    }
  }, [roleCreated]);

  if (roles.error === "Token is not valid") {
    navigate("/login");
  }

  const handleMenuChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMenus((prevMenus) => [...prevMenus, value]);
    } else {
      setMenus((prevMenus) => prevMenus.filter((menu) => menu !== value));
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        "https://coodrootz-be.onrender.com/api/roles/deleteRole",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete role");
      }

      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
      enqueueSnackbar("Role deleted successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error deleting role", { variant: "error" });
    }
  };

  const popupHandler = async (id) => {
    setPopupbox(true);
    try {
      const response = await fetch(
        "https://coodrootz-be.onrender.com/api/roles/getrolebyid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      setUpdate({ ...data, id });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error fetching role details", { variant: "error" });
    }
  };

  const menusData = ["menu1", "menu2", "menu3"];

  return (
    <div className="role-page">
      {popupbox && (
        <Popup
          data={update}
          menusData={menusData}
          setPopupbox={setPopupbox}
          token={token}
          response={roles}
        />
      )}
      <h2 className="role-page-h2">Role Management</h2>
      <form onSubmit={submitHandler} className="role-page-form">
        <div>
          <label>Role Name:</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>
        <div>
          <label>Menus:</label>
          {menusData.map((e, i) => (
            <div key={i}>
              <label>
                <input type="checkbox" value={e} onChange={handleMenuChange} />
                {e}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Create Role</button>
      </form>
      <h3>Existing Roles:</h3>
      <ul>
        {roles.map((e, i) => (
          <li key={e._id}>
            {e.name} - {e.menus.join(", ")}
            <div className="role-btn">
              <button onClick={() => popupHandler(e._id)}>Update</button>
              <button onClick={() => deleteHandler(e._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
