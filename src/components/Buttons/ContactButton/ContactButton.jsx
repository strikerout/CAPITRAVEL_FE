import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import style from "./contactButton.module.scss" 

const ContactButton = () => {
  return (
    <a
      href="https://wa.me/1234567890" 
      target="_blank"
      rel="noopener noreferrer"
      className={style.contactButton}
    >
      <FaWhatsapp className={style.icon} />
      Contact us
    </a>
  );
};

export default ContactButton;
