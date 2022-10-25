import { WEATHER_URL, WEATHER_API } from "./constants";

class WeatherService {
  async fetchFiveDayForecast() {
    return new Promise(async (success, failure) => {
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
          success({response, data});
        } else {
          failure({error: 'Invalid http request'});
        }
      } catch(error) {
        failure(error);
      }
    })
  }
}

export default WeatherService;