import { useState } from "react";
import Weather from "./Weather";

const Countries = ({ countries, onChoseCcountry }) => {
  const [countryShow, setCountryShow] = useState(countries)

  const Country = () => {
    const getSelectedCountry = (country) => {
      onChoseCcountry(country)
    }

    if (countries.length > 10) {
      return <p>too many countries, specify another filter</p>;
    }

    if (countries.length > 2 && countries.length <= 10) {
      return (
        <div>
          {countries.map((country) => (
            <div key={country.capital}>
              <p key={country.tld}>{country.name.common}</p>
              <button onClick={() => getSelectedCountry(country.name.common)}>show</button>
            </div>
          ))}
        </div>
      );
    }

    if (countries.length === 1) {
      return (
        <div>
          {countries.map((country) => (
            <div key={country.capital}>
              <h2>{country.name.common}</h2>
              <p>capital: {country.capital}</p>
              <p>area: {country.area}</p>
              {/* <p>{country.languages}</p> */}
              <img src={country.flags.png} alt={country.capital} />
              <Weather country={country} />
            </div>
          ))}
        </div>
      );
    }
  };

  return <Country />;
};

export default Countries;
