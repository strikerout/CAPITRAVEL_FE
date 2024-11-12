import style from "./headerUserLogin.module.scss";
import arrow from "../../../public/arrow.svg";
import heart from "../../../public/heart_filled.svg";
import reservation from "../../../public/reservation_icon.svg";
import logout from "../../../public/logout_icon.svg";
import { useEffect, useState } from "react";
import api from "../../api/api";

const HeaderUserLogin = ({ email }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const emailUser = email;
  console.log(emailUser);
  const token = localStorage.getItem("token");
  console.log(token);

useEffect(() => {
  const getUserByEmail = async () => {
    try {
      const response = await api.get(`/users/${emailUser}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); 
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  if (email && token) {
    getUserByEmail();
  
  }
  console.log(user)
}, []);

console.log(user)

  return (
    <>
      <div
        className={style.userMenuContainer}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className={style.user}>
          <div className={style.userAvatar}>
            <p> {email} </p>
          </div>
          <p></p>
        </div>
        <img src={arrow} alt="" />
      </div>
      <div className={`${style.dropdownMenu} ${open || style.inactive}`}>
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
