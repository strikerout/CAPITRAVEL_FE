import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import style from "./contactButton.module.scss" 

const ContactButton = () => {
    const whatsappNumber = "573133776700"; // Reemplaza con tu número de WhatsApp
    const defaultMessage = "Hi! I want more information"; // Tu mensaje por defecto en inglés
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
  
    return (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={style.contactButton}
      >
        <FaWhatsapp className={style.icon}/>
        Contact Us
      </a>
    );
  };

export default ContactButton;
