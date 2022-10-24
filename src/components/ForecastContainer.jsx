import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import {WEATHER_URL, WEATHER_API} from "../constants";

class ForecastContainer extends React.Component {

  async componentDidMount() {
    try {
      const response = await fetch(`${WEATHER_URL}59d4c6fc6e13eaab4d9b6f5e00285021`);
      if (response.ok) {

        const json = await response.json();
        const data = await json.list
        .filter(day => day.dt_txt.includes("00:00:00"))
        .map(item => ({
          temp: item.main.temp,
          dt: item.dt,
          date: item.dt_txt,
          imgId: item.weather[0].icon,
          desc: item.weather[0].description
        }));
        console.log('data: ', data);
      } else console.log('response is not ok');
    } catch(err) {
      console.log("There was an error: ", err);
    }
  }

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