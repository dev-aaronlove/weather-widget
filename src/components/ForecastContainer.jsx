import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";

class ForecastContainer extends React.Component {

  render() {
    return (
      <div>
        <div>Forecast Container</div>
        <DegreeToggle />
        <DayCard />
      </div>
    )
  }
}

export default ForecastContainer;