import React, { useState } from "react";
import style from "./experienceDates.module.scss";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceDates = ({ data, reservations, onDateTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const availableDays = data.availableDays.map((day) => day.toUpperCase());
  const serviceHours = data.serviceHours.split("-");
  const today = new Date();

  const mapDayToNumber = (day) => {
    const daysMap = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };
    return daysMap[day] || -1;
  };

  const getDurationInMs = (quantity, timeUnit) => {
    const timeUnitToMs = {
      MINUTES: 60 * 1000,
      HOURS: 60 * 60 * 1000,
      DAYS: 24 * 60 * 60 * 1000,
    };
    return quantity * (timeUnitToMs[timeUnit] || 0);
  };

  const experienceDurationMs = getDurationInMs(data.quantity, data.timeUnit);
  const allowedDays = new Set(availableDays.map(mapDayToNumber));

  const isDayReserved = (date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    return reservations.some(({ checkIn, checkOut }) => {
      const reservationStart = new Date(checkIn).getTime();
      const reservationEnd = new Date(checkOut).getTime();
      const blockStart = startOfDay.getTime();
      const blockEnd = blockStart + experienceDurationMs;
      return (
        (blockStart >= reservationStart && blockStart < reservationEnd) ||
        (blockEnd > reservationStart && blockEnd <= reservationEnd) ||
        (blockStart <= reservationStart && blockEnd >= reservationEnd)
      );
    });
  };

  const isTimeReserved = (date) => {
    const blockStart = date.getTime();
    const blockEnd = blockStart + experienceDurationMs;

    return reservations.some(({ checkIn, checkOut }) => {
      const reservationStart = new Date(checkIn).getTime();
      const reservationEnd = new Date(checkOut).getTime();
      return (
        (blockStart >= reservationStart && blockStart < reservationEnd) ||
        (blockEnd > reservationStart && blockEnd <= reservationEnd) ||
        (blockStart <= reservationStart && blockEnd >= reservationEnd)
      );
    });
  };

  const filterDays = (date) => {
    const isAllowedDay = allowedDays.has(date.getDay());
    const isNotReserved = !isDayReserved(date);
    return isAllowedDay && isNotReserved;
  };

  const filterTimes = (date) => {
    const minTime = new Date(date);
    minTime.setHours(
      serviceHours[0].split(":")[0],
      serviceHours[0].split(":")[1]
    );
    const maxTime = new Date(date);
    maxTime.setHours(
      serviceHours[1].split(":")[0],
      serviceHours[1].split(":")[1]
    );
    return date >= minTime && date <= maxTime && !isTimeReserved(date);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const hours = formattedDate.getHours().toString().padStart(2, "0");
    const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    console.log(`Formatted date: ${formattedDate}`);
    if (onDateTimeSelect) {
      onDateTimeSelect(formattedDate);
    }
  };

  return (
    <div className={style.policyContainer}>
      <h3>Add dates to book</h3>
      <h5>Choose the start time of your experience</h5>
      <div>
        <label>Available Time:</label>
        <p>{data.serviceHours}</p>
      </div>
      <Calendar
        monthsShown={2}
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={filterDays}
        filterTime={filterTimes}
        minDate={today}
        showTimeSelect
        timeIntervals={60}
        minTime={new Date(`1970-01-01T${serviceHours[0]}:00`)}
        maxTime={new Date(`1970-01-01T${serviceHours[1]}:00`)}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select a weekday"
      />
      {selectedDate && (
        <p>
          <strong>Selected Date & Time:</strong> {selectedDate.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default ExperienceDates;
