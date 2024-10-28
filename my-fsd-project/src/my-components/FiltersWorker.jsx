import React, { useState } from "react";

const Filters = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState(""); // State for selected area

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value); // Update the selected area
  };

  return (
    <div>
      <div className="filter">
        <span>Jobs:</span>
        <span id="filter-toggle" className="filter-text" onClick={toggleFilter}>
          Filters
        </span>
      </div>
      <div
        id="filter-box"
        className={isFilterVisible ? "filter-box show" : "filter-box"}
      >
        <div className="filter-group">
          <span>Duration</span>
          <label>
            <input type="checkbox" name="duration" value="2-3_days" /> 2-3 days
          </label>
          <label>
            <input type="checkbox" name="duration" value="1_week" /> 1 week
          </label>
          <label>
            <input type="checkbox" name="duration" value="2-3_weeks" /> 2-3
            weeks
          </label>
          <label>
            <input type="checkbox" name="duration" value="1_month" /> 1 month
          </label>
        </div>
        <div className="filter-group">
          <label htmlFor="area-select">Area:</label>
          <select
            id="area-select"
            name="area"
            value={selectedArea} // Use value prop for controlled component
            onChange={handleAreaChange} // Handle change to update state
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Banglore">Banglore</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
