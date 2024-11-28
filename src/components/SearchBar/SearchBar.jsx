import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import style from "./searchbar.module.scss";
import PrimaryButton from "../Buttons/PrimaryButton";
import useExperiences from '../../hooks/useExperience'
import ProductCard from "../Cards/ProductCard";

const SearchBar = () => {

  const{loading, countries, findExperiences, setFoundExperiences} = useExperiences();

  const [keywords, setKeywords] = useState("");
  const [country, setCounty] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [stringStartDate, setStringStartDate] = useState("")
  const [stringEndDate, setStringEndDate] = useState("")

  const [resultList, setResultList] = useState([]);

  const handleCheckOutChange = (date) => {
    if (date > checkInDate || !checkInDate) {
      setCheckOutDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      setStringEndDate(formattedDate);
    } else {
      alert("La fecha de check-out debe ser posterior al check-in.");
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(country, encodeURIComponent(keywords), stringStartDate, stringEndDate)
    setResultList( await findExperiences(country, encodeURIComponent(keywords), stringStartDate, stringEndDate))
  }

  return (
    <div className={style.div_search_bar_container}>
      <h4>Find the experience you’ve been looking for</h4>
      <form onSubmit={handleSubmit} className={style.button_inputs_container}>
        <div className={style.inputs_container}>
          <div className={style.input_container}>
            <label htmlFor="plan">What’s your plan?</label>
            <input type="text" placeholder="Drink mate, surf,..." 
            onChange={(e) =>
              setKeywords(e.target.value)
            }
            />
          </div>

          <div className={style.input_container}>
            <div className={style.label_icon_container}>
              <MdPlace className={style.icon_location} />
              <label htmlFor="where">Where?</label>
            </div>
            <select
              onChange={(e) =>
                setCounty(e.target.value)
              }
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
            </select>
          </div>

          <div className={style.input_container}>
            <div className={style.label_icon_container}>
              <FaCalendar className={style.icon}/>
              <label>Check-In</label>
            </div>

            <DatePicker
              selected={checkInDate}
              onChange={(date) => {
                if (date) {
                  setCheckInDate(date);
                  // Convertir la fecha al formato yyyy/mm/dd
                  const formattedDate = date.toISOString().split("T")[0];
                  setStringStartDate(formattedDate);
                } else {
                  setCheckInDate(null);
                  setStringStartDate("");
                }
              }}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
            />
            {/* <div className={style.checkbox_container}>
              <input type="checkbox" />
              <label htmlFor=""> I`m not sure yet</label>
            </div> */}
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
              placeholderText="Select date"
            />
            {/* <div className={style.checkbox_container}>
              <input type="checkbox" />
              <label htmlFor=""> I`m not sure yet</label>
            </div> */}
          </div>
          <PrimaryButton type="submit">Search</PrimaryButton>
        </div>
        
      </form>

      <section className={style.resultList}>
        {resultList ? resultList.map((experience, index) => (
                  <ProductCard key={index} data={experience} />
              ))
              
        : null}
      </section>
      
   
      

    </div>
  );
};
export default SearchBar;
