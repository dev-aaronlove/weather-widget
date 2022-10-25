import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import {WEATHER_URL, WEATHER_API} from "../constants";
import WeatherService from "../services";

const weather = new WeatherService();

class ForecastContainer extends React.Component {
  state = { //don't need constructor since not passing in props
    data: [],
    loading: false,
    error: false,
    degreeType: "fahrenheit",
  }

  async componentDidMount() {
    this.setState({loading: true});
    weather.fetchFiveDayForecast()
    .then((res) => {
      if (res && res.response.ok) {
        this.setState({
          data: res.data,
          loading:false
        })
      } else {
        this.setState({loading: false});
      }
    }, (error) => {
      console.log(error);
      this.setState({
        error: true,
        loading: false
      })
    })
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