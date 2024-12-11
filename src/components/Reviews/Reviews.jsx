import React, { useEffect, useState } from "react";
import style from "./reviews.module.scss";
import useExperiences from "../../hooks/useExperience";
import { FaStar } from "react-icons/fa";

const Reviews = ({ experienceId }) => {
  const { getReviews } = useExperiences(); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAvatarLetters = (name = "", lastName = "") => {
    const firstLetterName = name ? name.charAt(0).toUpperCase() : "";
    const firstLetterLastName = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstLetterName}${firstLetterLastName}`;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(experienceId);
        setReviews(data); 
      } catch (err) {
        setError(err.message || "Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [experienceId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  const cleanMessage = (message) => {
    return message.replace(/^"|"$/g, ""); // Elimina las comillas dobles al inicio y final del string
  };

  return (
    <section className={style.containerReview}>
      <h3>Reviews, what do users say?</h3>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div className={style.cardReview} key={review.id}>
            <div className={style.headerCard}>
              <div className={style.userContainer}>
                <div className={style.userAvatar}>
                <p>{getAvatarLetters(review.name, review.lastname)}</p>
                </div>
              <div>
                <p className={style.name}>{review.name} {review.lastname} </p>
                <p className={style.date}>{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              </div>
              <p><FaStar /> {review.rating}</p>
            </div>
            <p className={style.message}>{cleanMessage(review.reviewMessage.trim())}
            </p>
          </div>
        ))
      )}
    </section>
  );
};

export default Reviews;
