import style from "./headerUserLogin.module.scss";
import arrow from "../../../public/arrow.svg";
import heart from "../../../public/heart_filled.svg";
import reservation from "../../../public/reservation_icon.svg";
import logoutIcon from "../../../public/logout_icon.svg";
import adminIcon from "../../../public/icon_admin.svg"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../api/users";
import useAuthLogin from "../../hooks/useAuthLogin";

const HeaderUserLogin = ({ email, role }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const { logout } = useAuthLogin();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const userByEmail = async () => {
      try {
        const response = await getUserByEmail(email);
        localStorage.setItem("userFavoriteExperienceList", JSON.stringify(response.data.favoriteExperienceIds));
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); 
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={style.userMenuContainer}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <div className={style.user}>
          <div className={style.userAvatar}>
            <p>{avatar}</p>
          </div>
          <p>Hi, {name}!</p>
        </div>
        <img src={arrow} alt="" />
      </div>
      {
        open && (
          <div  ref={dropdownRef} className={`${style.dropdownMenu} ${open || style.inactive}`}>
          {role === "ROLE_ADMIN" && (
            <Link to="/administrator" className={style.menuItem} onClick={() => {setOpen(false);}}>
              <img src={adminIcon} alt="admin icon" />
              <p>Admin Panel</p>
            </Link>
          )
          }
          <Link to="/experiences/favorites" className={style.menuItem} onClick={() => {setOpen(false);}}>
            <img src={heart} alt="My favorites" />
            <p>My favorites</p>
          </Link>
  
          <Link to="/reservations" className={style.menuItem} onClick={() => {setOpen(false);}}>
            <img src={reservation} alt="My reservations" />
            <p>My reservations</p>
          </Link>
  
          <div className={style.menuItem}>
            <img src={logoutIcon} alt="" />
            <button className={style.p_button} onClick={() => handleLogOut()}>
              Logout
            </button>
          </div>
        </div>
        )
      }

    </>
  );
};

export default HeaderUserLogin;
