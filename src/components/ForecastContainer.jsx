import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import {WEATHER_URL, WEATHER_API} from "../constants";

class ForecastContainer extends React.Component {
  state = { //don't need constructor since not passing in props
    data: [],
    loading: false,
    error: false,
  }

  async componentDidMount() {
    this.setState({loading: true});
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
          imgId: item.weather[0].id,
          desc: item.weather[0].description
        }));
        this.setState({
          data, //short version of setting data: data since same name
          loading: false
        }); 
      } else {
        this.setState({
          error: true,
          loading: false
        }); 
      }
    } catch(err) {
      console.log("There was an error: ", err);
    }
  }

  render() {
    const { loading, error, data } = this.state;
    return (
      <div>
        <div>Forecast Container</div>
        <DegreeToggle />
        {!loading ? data.map((item) => (
          <DayCard data={item} key={item.dt}/>
        )) : <div>Loading...</div>}
      </div>
    )
  }
}

export default ForecastContainer;