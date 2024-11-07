import style from "./headerUserLogin.module.scss";
import arrow from "../../../public/arrow.svg";
import heart from "../../../public/heart_filled.svg";
import reservation from "../../../public/reservation_icon.svg";
import logout from "../../../public/logout_icon.svg";
import { useState } from "react";

const HeaderUserLogin = () => {
    const [open, setOpen] = useState(false);
  return (
    <>
     <div className={style.userMenuContainer} onClick={()=>{setOpen(!open)}}>
      <div className={style.user}>
        <div className={style.userAvatar}>
          <p>LA</p>
        </div>
        <p>Hi Lina!</p>
      </div>
      <img src={arrow} alt="" />
    </div>
    <div className={`${style.dropdownMenu} ${open && style.inactive}`}>
        <div className={style.menuItem}>
            <img src={heart} alt="" />
            <p>My favorites</p>
        </div>

        <div className={style.menuItem}>
            <img src={reservation} alt="" />
            <p>My reservations</p>
        </div>

        <div className={style.menuItem}>
            <img src={logout} alt="" />
            <p>Logout</p>
        </div>
        
    </div>
    </>
   
  );
};

export default HeaderUserLogin;
