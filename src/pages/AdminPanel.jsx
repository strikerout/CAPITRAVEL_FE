import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Categories from "../components/Categories/Categories";
import Properties from "../components/Properties/Properties";
import arrowIcon from "../../public/arrow.svg";

const AdminPanel = () => {
  return (
    <section className="adminPanel">
      <nav className="menuAdminPanel">
        <NavLink
          to="categories"
          className={({ isActive }) =>
            isActive ? "navlink-active" : "navlink-default"
          }
        >
          Categories <img src={arrowIcon} alt="arrow" />
        </NavLink>
        <NavLink
          to="properties"
          className={({ isActive }) =>
            isActive ? "navlink-active" : "navlink-default"
          }
        >
          Properties <img src={arrowIcon} alt="arrow" />
        </NavLink>
      </nav>

      <div>
        <Routes>
          <Route path="categories" element={<Categories />} />
          <Route path="properties" element={<Properties />} />
        </Routes>
      </div>
    </section>
  );
};

export default AdminPanel;
