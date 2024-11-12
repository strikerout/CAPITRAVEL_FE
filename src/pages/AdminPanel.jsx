import React, { useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Experiences from "../components/Experiences/Experiences"
import Categories from "../components/Categories/Categories";
import Properties from "../components/Properties/Properties";
import arrowIcon from "../../public/arrow.svg";
import capiCamp from "../../public/capi_camp.svg";
import BannerDashboard from "../components/BannerDashboard"
import Users from "../components/Users/Users";
import useAuthLogin from "../hooks/useAuthLogin";

const AdminPanel = () => {
  const {checkToken, role, username} = useAuthLogin();

  
  useEffect(() => {
    checkToken();
}, []);
  

  return (
    <>
    {role !== 'ROLE_ADMIN' ?
      <div className="messageAdminOnly">
        <img src={capiCamp} alt="Icon of capibara" />
        <h2>Oops! This panel is available only for administrator users</h2>
        <Link to={'/'}>Go home</Link>
      </div> 
      : 
      <div>
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
          <Route path="/" element={<BannerDashboard/>} />
          <Route path="categories" element={<Categories />} />
          <Route path="properties" element={<Properties />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="users" element={<Users/>} />
        </Routes>
      </div>     
    </section>
    </div>
    }
    <div className="mobileView">
        <img src={capiCamp} alt="Icon of capibara" />
        <h2>Oops! This panel isn't available on small devices</h2>
        <p>We recommend opening it on your computer for the best experience. 😊</p>
    </div> 
    </>
  );
};

export default AdminPanel;
