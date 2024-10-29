import React, { useState } from "react";

const Filters = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  return (
    <div>
      <div className="filter">
        <span>Candidates:</span>
        <span id="filter-toggle" className="filter-text" onClick={toggleFilter}>
          Filters
        </span>
      </div>
      <div
        id="filter-box"
        className={isFilterVisible ? "filter-box show" : "filter-box"}
      >
        <div className="filter-group">
          <span>Gender</span>
          <label>
            <input type="checkbox" name="gender" value="Male" /> Male
          </label>
          <label>
            <input type="checkbox" name="gender" value="Female" /> Female
          </label>
          <label>
            <input type="checkbox" name="gender" value="Other" /> Other
          </label>
        </div>
        <div className="filter-group">
          <label htmlFor="area-select">Area:</label>
          <select
            id="area-select"
            name="area"
            value={selectedArea}
            onChange={handleAreaChange}
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
