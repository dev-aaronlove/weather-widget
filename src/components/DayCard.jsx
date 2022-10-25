import React from "react";
import moment from "moment/moment";

const DayCard = ({ data, degreeType }) => {
  const { temp, dt, imgId, desc } = data;

  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-${imgId} owf-5zx`;

  const fahrenheit = Math.round(temp);
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));

  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMM Do, h:mm a')}</p>
        <i className={icon}/>
        <h2>{degreeType==="celcius" ? `${celsius} °C` : `${fahrenheit} °F`}</h2>
        <div className="card-body">
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;