import React, { useState } from "react";

const Filters = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  return (
    <div>
      <div className="filter">
        <span>Candidates:</span>
        <span id="filter-toggle" className="filter-text" onClick={toggleFilter}>
          Filters
        </span>
      </div>
      <div id="filter-box" className={isFilterVisible ? "filter-box show" : "filter-box"}
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
        <div class="filter-group">
          <label for="area-select">Area:</label>
          <select id="area-select" name="area">
            <option value="" disabled selected>Choose</option>
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
