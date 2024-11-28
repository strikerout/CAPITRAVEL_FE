import React, { useState } from "react";
import style from "./ratingForm.module.scss";
import PrimaryButton from "../Buttons/PrimaryButton";
import { IoCloseCircle } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import useExperiences from "../../hooks/useExperience";
import useAuthLogin from "../../hooks/useAuthLogin";

const RatingForm = ({experience}) => {
  const {createReview} = useExperiences()
  const [openModal, setOpenModal] = useState(false);
  const {username} = useAuthLogin()

  const [loading, setLoading] = useState(false);

  const handleShare = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [rating, setRating] = useState(0); // Para almacenar la calificación
  const [description, setDescription] = useState(""); // Para la descripción

  const handleRating = (value) => {
    setRating(value); // Actualiza la calificación seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReview(experience.id, username, rating, description);
      console.log("Rating:", rating);
      console.log("Description:", description);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
    setOpenModal(false);
  };

  return (
    <>
    {loading && <div>Loading...</div>}

      <button
        onClick={handleShare}
        className={`buttonMoreAction`}
      >
        <FaStar />
        Rate
      </button>
      {openModal && (
      <div className={style.modalRate}>
      <form onSubmit={handleSubmit} className={style.form}>
        <button onClick={handleCloseModal} className={style.closeButton}>
          <IoCloseCircle />
        </button>
        <div>
          <h3>Rate your experience </h3>
          <p>with <b>{experience.title}</b></p>
        </div>
        <div className={style.containerStar}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleRating(star)}
              style={{
                background: "none",
                border: "none",
                fontSize: "40px",
                cursor: "pointer",
                color: star <= rating ? "#EB5436" : "#ccc",
              }}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your review here..."
          rows="4"
          className={style.textarea}
        /> 
        <PrimaryButton type='submit'>Send Rate</PrimaryButton>
      </form>
    </div>
      )}
    </>
  );
};

export default RatingForm;
