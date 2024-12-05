import React, { useState } from "react";
import DatePickerPicker from "react-datepicker";
import { addDays, getDay } from "react-datepicker/dist/date_utils.d.ts";

import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {

  
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    const isWeekday = (date) => {
      const day = getDay(date);
      return day !== 0 && day !== 2 && day !== 4 && day !== 6;
    };
    
    return (
      <DatePickerPicker
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--previous"
              }
              style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
              onClick={decreaseMonth}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                }
              >
                {"<"}
              </span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              aria-label="Next Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--next"
              }
              style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
              onClick={increaseMonth}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                }
              >
                {">"}
              </span>
            </button>
          </div>
        )}
        //selected={startDate}
        //onChange={(date) => setStartDate(date)}
       monthsShown={2}
        //onChange={onChange}
       // startDate={startDate}
       // endDate={endDate}
       // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
       // selectsRange
       // selectsDisabledDaysInRange
       // inline
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={[addDays(new Date(), 1), addDays(new Date(), 9)]}
        selectsRange
        selectsDisabledDaysInRange
        filterDate={isWeekday}
        placeholderText="Select a weekday"


      />
    );
  };

  
export default Calendar;