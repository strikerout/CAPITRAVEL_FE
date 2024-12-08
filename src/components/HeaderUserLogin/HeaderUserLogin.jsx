import style from "./headerUserLogin.module.scss";
import arrow from "../../../public/arrow.svg";
import heart from "../../../public/heart_filled.svg";
import reservation from "../../../public/reservation_icon.svg";
import logoutIcon from "../../../public/logout_icon.svg";
import adminIcon from "../../../public/icon_admin.svg"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../api/users";
import useAuthLogin from "../../hooks/useAuthLogin";

const HeaderUserLogin = ({ email, role }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const { logout } = useAuthLogin();

  useEffect(() => {
    const userByEmail = async () => {
      try {
        const response = await getUserByEmail(email);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    if (email) {
      userByEmail();
    }
  }, [email]);

  const getAvatarLetters = (name = "", lastname = "") => {
    const firstLetterName = name ? name.charAt(0).toUpperCase() : "";
    const firstLetterLastName = lastname
      ? lastname.charAt(0).toUpperCase()
      : "";
    return `${firstLetterName}${firstLetterLastName}`;
  };

  const avatar = getAvatarLetters(user.name, user.lastName);

  const greeting = () => {
    return `${user.name.charAt(0).toUpperCase()}${user.name.slice(1)}`;
  };

  const name = user.name ? greeting() : "";

  const handleLogOut = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

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
            <p>{avatar}</p>
          </div>
          <p>Hi,{name}!</p>
        </div>
        <img src={arrow} alt="" />
      </div>
      <div className={`${style.dropdownMenu} ${open || style.inactive}`}>
        {role === "ROLE_ADMIN" && (
          <Link to="/administrator" className={style.menuItem}>
          <img src={adminIcon} alt="admin icon" />
          <p>Admin Panel</p>
          </Link>
         ) 
        }
        <div className={style.menuItem}>
          <img src={heart} alt="" />
          <p>My favorites</p>
        </div>

        <div className={style.menuItem}>
          <img src={reservation} alt="" />
          <p>My reservations</p>
        </div>

        <div className={style.menuItem}>
          <img src={logoutIcon} alt="" />
          <button className={style.p_button} onClick={() => handleLogOut()}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderUserLogin;
