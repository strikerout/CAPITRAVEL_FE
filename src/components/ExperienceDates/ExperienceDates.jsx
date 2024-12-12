import React from "react";
import styles from "./experienceDates.module.scss";
const ExperienceDates = ({ data }) => {

  return (
    <div className={styles.reservationContainer}>
      <div>
      <h3>Add dates to book</h3>
      <p>Choose the start time of your experience
      </p>
      </div>
      <div>
        <label className={styles.subtitle}>Service hours</label>
        <p>{data.serviceHours}</p>
      </div>
      <div>
        <label className={styles.subtitle}>Days of service</label>
        <div className={styles.days}>
          {data.availableDays.map((day, index) =>(
           <p key={index}>
            {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
            {index < data.availableDays.length - 1 ? ", " : ""}
          </p>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default ExperienceDates;
