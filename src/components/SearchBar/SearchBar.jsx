import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import style from "./searchbar.module.scss";
import PrimaryButton from "../Buttons/PrimaryButton";
import useExperiences from "../../hooks/useExperience";
import ClearButton from "../Buttons/ClearButton";

const SearchBar = ({ search, setSearch }) => {
  const { loading, countries, findExperiences, setFoundExperiences } =
    useExperiences();

  const [keywords, setKeywords] = useState("");
  const [country, setCounty] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [stringStartDate, setStringStartDate] = useState("");
  const [stringEndDate, setStringEndDate] = useState("");

  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    // Detectar el tamaño de la ventana y actualizar el estado isMobileExpanded
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1000) { 
          setIsMobileExpanded(true); 
        } else {
          setIsMobileExpanded(false); 
        }
      };
    
      handleResize(); 
    
      window.addEventListener("resize", handleResize); 
    
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMobileSearch = () => {
      if (window.innerWidth < 1000) { 
        setIsMobileExpanded((prev) => !prev);
      }
    };

  const handleCheckOutChange = (date) => {
    if (date > checkInDate || !checkInDate) {
      setCheckOutDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      setStringEndDate(formattedDate);
    } else {
      alert("La fecha de check-out debe ser posterior al check-in.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.innerWidth < 1000 && isMobileExpanded) {
      setIsMobileExpanded(false); 
    }

    if (keywords || country || checkInDate || checkOutDate) {
      setSearch({
        country: country,
        keywords: encodeURIComponent(keywords),
        startDate: stringStartDate,
        endDate: stringEndDate,
      });
    }
  };

  const cleanSearch = () => {
    setCounty("");
    setKeywords("");
    setCheckInDate(null);
    setCheckOutDate(null);
    setSearch({});
  };

  return (
    <div className={style.div_search_bar_container}>
      <h4>Find the experience you’ve been looking for</h4>
      <form onSubmit={handleSubmit}>
        <div className={style.inputs_container}>
          <div className={style.input_container}>
            <label htmlFor="plan">What’s your plan?</label>
            <input
              type="text"
              placeholder="Drink mate, surf,..."
              value={keywords}
              onClick={toggleMobileSearch}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          {isMobileExpanded && (
            <>
              <div className={style.input_container}>
                <div className={style.label_icon_container}>
                  <MdPlace className={style.icon_location} />
                  <label htmlFor="where">Where?</label>
                </div>
                <select
                  value={country}
                  onChange={(e) => setCounty(e.target.value)}
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
                  <FaCalendar className={style.icon} />
                  <label>Check-In</label>
                </div>

                <DatePicker
                  selected={checkInDate}
                  value={checkInDate}
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
              </div>

              <div className={style.input_container}>
                <div className={style.label_icon_container}>
                  <FaCalendar className={style.icon} />
                  <label>Check-Out</label>
                </div>

                <DatePicker
                  selected={checkOutDate}
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                  minDate={checkInDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                />
              </div>
            </>
          )}
          <div className={style.button_inputs_container}>
            <ClearButton func={cleanSearch}>Clean</ClearButton>
            <PrimaryButton type="submit">Search</PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
