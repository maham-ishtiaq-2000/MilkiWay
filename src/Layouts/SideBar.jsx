import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import {
  faHome,
  faPieChart,
  faGear,
  faSignOutAlt,
  faCartShopping,
  faAdd,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom/dist";

const Sidebar = () => {
  const route = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  
  const icons = [
    { to: "/homePage", icon: faHome, roles: ["dairyFarmOwner", "customer"] },
    { to: "/productCartPage", icon: faCartShopping, roles: ["customer"] },
    { to: "/addProduct", icon: faAdd , roles : ["dairyFarmOwner"]},
    { to : "/allFarmerProduct" , icon : faClipboardList , roles : ["dairyFarmOwner"]},
    { to: "/orderHistory", icon: faPieChart, roles: ["customer"] },
    { to: "/settingsPage", icon: faGear, roles: ["dairyFarmOwner", "customer"] },
  ];

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col h-full bg-offWhite text-pink items-end py-4 pl-4 z-50">
      <NavLink to="/homePage" className="w-20 h-20 mb-5 mr-2">
        <img src={logo} alt="Logo" />
      </NavLink>
      {icons.filter(item => item.roles.includes(role)).map((item, index) => (
        <div className={`p-4 ${route.pathname === item.to ? "bg-offWhite" : ""}`} key={index}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "py-4 px-4 rounded flex justify-center bg-pink text-white hover:bg-pink"
                : "py-4 px-4 rounded flex justify-center hover:bg-pink hover:text-white"
            }
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-salmon-600 text-xl hover:text-white"
            />
          </NavLink>
        </div>
      ))}

      <div className="mt-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
              isActive
                ? "py-4 px-4 mr-3 rounded flex justify-center bg-pink text-white hover:bg-pink"
                : "py-4 px-4 mr-3 rounded flex justify-center hover:bg-pink hover:text-white"
            }
          onClick={handleLogout}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="text-salmon-600 text-4xl hover:text-white"
            style={{ fontSize: "24px" }}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
