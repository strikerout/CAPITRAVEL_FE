import { useState } from "react";
import style from "./buttonShare.module.scss";
import capiRelax from "../../../../public/capi_relax.svg";

import { IoMdShare } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

const ButtonShare = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleShare = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const shareUrl = window.location.href;
  const title = product.title; 
  const description = product.description; 

  const handleTwitterShare = () => {
    const text = `Check out this amazing experience I saw on Capitravel! \n\n${title} 😁 #Capitravel`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this amazing experience I saw on Capitravel! \n\n${title} 😁\n\n${description} \n\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleTelegramShare = () => {
    const text = `Check out this amazing experience I saw on Capitravel! \n\n${title} 😁\n\n${description}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank");
  };
  
  const handleEmailShare = () => {
    const body = `Check out this amazing experience I saw on Capitravel! \n\n${title} 😁\n\n${description}\n\n${shareUrl}`;
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
  };
  

  return (
    <>
      <button onClick={handleShare} className={`buttonMoreAction ${style.buttonshare}`}>
        <IoMdShare />
        Share
      </button>
      
      {openModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <button onClick={handleCloseModal} className={style.closeButton}>
            <IoCloseCircle />
            </button>
            <div className={style.textContainer}>
              <img src={capiRelax} alt=""/>
              <div>
                <h4>Share this experience with your friends!</h4>
                <h3>{title}</h3>
                <div className={style.location}>
                  <FaLocationDot />
                  <p>{product.ubication}</p>
                </div>
                <p className={style.description}>{description}</p>
              </div>
            </div>
            <div className={style.shareOptionContainer}>
                <button onClick={handleWhatsAppShare} className={`${style.shareOption} ${style.whatsapp}`}>
                <FaWhatsapp className={style.icon}/>
                </button>

                <button onClick={handleTelegramShare} className={`${style.shareOption} ${style.telegram}`}>
                <FaTelegramPlane className={style.icon}/>
                </button>

                <button onClick={handleEmailShare} className={`${style.shareOption} ${style.mail}`}>
                <IoMdMail className={style.icon}/>
                </button>

                <button onClick={handleTwitterShare} className={`${style.shareOption} ${style.x}`}>
                <BsTwitterX className={style.icon}/>
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonShare;
