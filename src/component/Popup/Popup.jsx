import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup = ({ data, menusData, setPopupbox, token, response }) => {
  const [name, setName] = useState(data.name || "");
  const [menus, setMenus] = useState(data.menus || []);

  useEffect(() => {
    setName(data.name || "");
    setMenus(data.menus || []);
  }, [data]);

  if (!Array.isArray(menusData)) {
    return null;
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMenuChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMenus([...menus, value]);
    } else {
      setMenus(menus.filter((menu) => menu !== value));
    }
  };

  const updateHandler = async () => {
    try {
      const respo = await fetch("https://coodrootz-be.onrender.com/api/roles/updateRole", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: data.id,
          name,
          menus,
        }),
      });
      const responseData = await respo.json();
      console.log(responseData);
      setPopupbox(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup-box">
      <input type="text" value={name} onChange={handleNameChange} />
      <div>
        <label>Menus:</label>
        {menusData.map((menu, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={menu}
                checked={menus.includes(menu)}
                onChange={handleMenuChange}
              />
              {menu}
            </label>
          </div>
        ))}
        <div className="popup-updatebtn">
          <button onClick={updateHandler}>Update</button>
          <button onClick={() => setPopupbox(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
