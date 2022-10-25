import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import {WEATHER_URL, WEATHER_API} from "../constants";

class ForecastContainer extends React.Component {
  state = { //don't need constructor since not passing in props
    data: [],
    loading: false,
    error: false,
    degreeType: "fahrenheit",
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

  updateForecastDegree = ({ target: {value}}) => this.setState({degreeType: value});

  render() {
    const { loading, error, data, degreeType } = this.state;
    return (
      <div className="container mt-5">
        <h1 className="display-1 jumbotron bg-light py-5 mb-5">5-Day Forecast</h1>
        <h5 className="text-muted">Herriman UT, US</h5>
        <DegreeToggle degreeType={degreeType} updateForecastDegree={this.updateForecastDegree}/>
        <div className="row justify-content-center">
          {!loading ? data.map((item) => (
            <DayCard 
              key={item.dt}
              data={item} 
              degreeType={degreeType}
            />
          )) : <div>Loading...</div>}
        </div>
        {error && <h3 className="text-danger">Error loading data 😞</h3>}
      </div>
    )
  }
}

export default ForecastContainer;