import style from './timeRangeSelector.module.scss'
const TimeRangeSelector = ({ startTime, endTime, onChange }) => {

  const generateMilitaryHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  };

  const militaryHours = generateMilitaryHours();

  const handleStartTimeChange = (e) => {
    const selectedStartTime = e.target.value;
    onChange(selectedStartTime, endTime); 
  };

  const handleEndTimeChange = (e) => {
    const selectedEndTime = e.target.value;
    onChange(startTime, selectedEndTime); 
  };

  return (
      <section className={style.containerTime}>
        <div>
          <label htmlFor="start-time">Start Time</label>
          <select
            id="start-time"
            value={startTime}
            onChange={handleStartTimeChange}
          >
            <option value="">00:00</option>
            {militaryHours.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="end-time">End Time</label>
          <select
            id="end-time"
            value={endTime}
            onChange={handleEndTimeChange}
          >
            <option value="">00:00</option>
            {militaryHours.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </section>
  );
};

export default TimeRangeSelector;
