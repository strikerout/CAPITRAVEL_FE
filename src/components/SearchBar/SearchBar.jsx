import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import style from "./searchbar.module.scss";
import PrimaryButton from "../Buttons/PrimaryButton";

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const handleCheckOutChange = (date) => {
    if (date > checkInDate || !checkInDate) {
      setCheckOutDate(date);
    } else {
      alert("La fecha de check-out debe ser posterior al check-in.");
    }
  };
  return (
    <div className={style.div_search_bar_container}>
      <h4>Find the experience you’ve been looking for</h4>
      <div className={style.button_inputs_container}>
        <div className={style.inputs_container}>
          <div className={style.input_container}>
            <label htmlFor="plan">What’s your plan?</label>
            <input type="text" placeholder="Drink mate, surfer,..." />
          </div>

          <div className={style.input_container}>
            <div className={style.label_icon_container}>
              <MdPlace className={style.icon_location} />
              <label htmlFor="where">Where?</label>
            </div>
            <select>
              <option value="">Select Categories</option>
              <option>Colombia</option>
            </select>
          </div>

          <div className={style.input_container}>
            <div className={style.label_icon_container}>
              <FaCalendar className={style.icon}/>
              <label>Check-In</label>
            </div>

            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
            />
            <div className={style.checkbox_container}>
              <input type="checkbox" />
              <label htmlFor=""> I`m not sure yet</label>
            </div>
          </div>

          <div className={style.input_container}>
            <div className={style.label_icon_container}>
              <FaCalendar className={style.icon}  />
              <label>Check-Out</label>
            </div>

            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutChange}
              minDate={checkInDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
            />
            <div className={style.checkbox_container}>
              <input type="checkbox" />
              <label htmlFor=""> I`m not sure yet</label>
            </div>
          </div>
        </div>
        <PrimaryButton type="submit">Search</PrimaryButton>
      </div>
    </div>
  );
};
export default SearchBar;
