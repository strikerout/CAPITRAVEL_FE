import style from "./DaysOfService.module.scss";

const DaysOfService = ({ selectedDays, fun }) => {
  const daysOfWeek = [
    { short: "Mon", full: "MONDAY" },
    { short: "Tue", full: "TUESDAY" },
    { short: "Wed", full: "WEDNESDAY" },
    { short: "Thu", full: "THURSDAY" },
    { short: "Fri", full: "FRIDAY" },
    { short: "Sat", full: "SATURDAY" },
    { short: "Sun", full: "SUNDAY" },
  ];


  const handleDayClick = (e, day) => {
    e.preventDefault();
    fun(day.full);
  };

  return (
    <div className={style.daysContainer}>
      <article className={style.daysButtons}>
        {daysOfWeek.map((day) => (
          <button
            key={day.short}
            className={`${style.dayButton} ${
              selectedDays.includes(day.full) ? style.selected : ""
            }`}
            onClick={(e) => handleDayClick(e, day)}
          >
            {day.short}
          </button>
        ))}
      </article>
    </div>
  );
};

export default DaysOfService;
