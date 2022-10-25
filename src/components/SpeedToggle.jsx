import React from "react";

const SpeedToggle = ({ updateSpeedType, speedType }) => {
  return (
    <div className="form-check form-check-inline">
      <select value={speedType} onChange={updateSpeedType}>
        <option value="mph">MPH</option>
        <option value="kmh">KMH</option>
      </select>
    </div>
  )
}

export default SpeedToggle;