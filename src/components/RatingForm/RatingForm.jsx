import React, { useState } from "react";
import style from "./ratingForm.module.scss";
import PrimaryButton from "../Buttons/PrimaryButton";
import { IoCloseCircle } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import useExperiences from "../../hooks/useExperience";
import useAuthLogin from "../../hooks/useAuthLogin";

const RatingForm = ({ experience }) => {
  const { createReview } = useExperiences();
  const [openModal, setOpenModal] = useState(false);
  const { username } = useAuthLogin();

  const handleShare = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(experience.id, username, rating, description);
    setOpenModal(false);
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleShare} className={`buttonMoreAction`}>
        <FaStar />
        Review
      </button>
      {openModal && (
        <div className={style.modalRate}>
          <form onSubmit={handleSubmit} className={style.form}>
            <button onClick={handleCloseModal} className={style.closeButton}>
              <IoCloseCircle />
            </button>
            <div>
              <h3>Rate your experience </h3>
              <p>
                with <b>{experience.title}</b>
              </p>
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
            <PrimaryButton type="submit">Send Review</PrimaryButton>
          </form>
        </div>
      )}
    </>
  );
};

export default RatingForm;
