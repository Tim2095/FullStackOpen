import React, { useEffect, useState } from "react";
import axios from "axios";
const Weather = ({ country }) => {
  const apiKey = import.meta.env.WEATHER_API_KEY;

  // Example usage
 
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.capital}?key=${apiKey}`
      )
      .then((resp) => setWeather(resp.data.currentConditions));
  }, [country]);

  return (
    <div>
      <h2>Weather In {country.capital}</h2>
      {console.log(weather)}
      <p>temperature {weather.temp} Fahrenheit </p>
      <p>wind {weather.windspeed}m/s</p>
    </div>
  );
};

export default Weather;
