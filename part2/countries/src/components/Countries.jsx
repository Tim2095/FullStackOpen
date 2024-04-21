import Input from "../ui/input";
import { useState } from "react";
import axios from "axios";
const Countries = ({ countries }) => {
  const [userInp, setuserInp] = useState("");
  const [temperature, setTemperature] = useState([]);


  const searchedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(userInp.toLowerCase())
  );

  const oneCountryHandler = (countyName) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    setuserInp(countyName);
    const country = countries.find(
      (country) => country.name.common === countyName
    );
    const lat = country.capitalInfo.latlng[0];
    const lng = country.capitalInfo.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        const icon = response.data.list[0].weather[0].icon;
        const temperatureData = {
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          temperature: response.data.list[0].main.temp,
          wind: response.data.list[0].wind.speed,
        };

        setTemperature(temperatureData);
      });
  };

  return (
    <div>
      <Input onChange={(e) => setuserInp(e.target.value)} />
      {searchedCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {countries.length > 10 &&
        searchedCountries.length !== 1 &&
        userInp !== "" &&
        searchedCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => oneCountryHandler(country.name.common)}>
              show
            </button>
          </div>
        ))}
      {searchedCountries.length === 1 &&
        searchedCountries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <div>
              <h3>languages:</h3>
              {Object.values(country.languages).map((language, index) => {
                return <li key={index}>{language}</li>;
              })}
              <img src={country.flags.png} alt="flag" />
              <h2>Weather in {country.capital}</h2>
              <p>Temperature {temperature.temperature} Celcius</p>
              <img src={temperature.icon} alt="weather icon" />
              <p>wind {temperature.wind} m/s</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Countries;
