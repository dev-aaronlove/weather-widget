import React from "react";
import moment from "moment/moment";

const DayCard = ({ data, degreeType, speedType }) => {
  const { temp, feelsLike, dt, imgId, desc, humidity, speed  } = data;

  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-${imgId} owf-5zx`;

  const fahrenheit = Math.round(temp);
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));
  const celsiusFeelsLike = Math.round((feelsLike - 32) * (5 / 9));
  const kmhSpeed = (speed * 1.60934).toFixed(1);

  console.log('speedType: ', speedType);
  console.log('speed: ', speed);
  console.log('kmhSpeed: ', kmhSpeed);
  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMM Do, h:mm a')}</p>
        <i className={icon}/>
        <h2>{degreeType==="celcius" ? `${celsius} °C` : `${fahrenheit} °F`}</h2>
        <p className="text-muted">Feels Like {degreeType==="celcius" ? `${celsiusFeelsLike} °C` : `${feelsLike} °F`} </p>
        <div className="card-body">
          <p className="card-text">{desc}</p>
          <p className="card-text">Humidity: {humidity}%</p>
          <p className="card-text">Wind Speed: {speedType==="kmh" ? `${kmhSpeed} KMH` : `${speed} MPH`}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;