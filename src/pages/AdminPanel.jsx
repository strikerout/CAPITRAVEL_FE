import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Experiences from "../components/Experiences/Experiences"
import Categories from "../components/Categories/Categories";
import Properties from "../components/Properties/Properties";
import arrowIcon from "../../public/arrow.svg";
import capiCamp from "../../public/capi_camp.svg";
import BannerDashboard from "../components/BannerDashboard"
import Users from "../components/Users/Users";

const AdminPanel = () => {
  return (
    <>
      <section className="adminPanel">
      <nav className="menuAdminPanel">
      <NavLink
          to="experiences"
          className={({ isActive }) =>
            isActive ? "navlink-active" : "navlink-default"
          }
        >
          Experiences <img src={arrowIcon} alt="arrow" />
        </NavLink>
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
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive ? "navlink-active" : "navlink-default"
          }
        >
          Users <img src={arrowIcon} alt="arrow" />
        </NavLink>
      </nav>
    
      <div>
        <Routes>
          <Route path="/" element={<BannerDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="properties" element={<Properties />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="users" element={<Users/>} />
        </Routes>
      </div>     
    </section>
    <div className="mobileView">
        <img src={capiCamp} alt="Icon of capibara" />
        <h2>Oops! This panel isn't available on small devices</h2>
        <p>We recommend opening it on your computer for the best experience. 😊</p>
    </div>
    </>
  );
};

export default AdminPanel;
