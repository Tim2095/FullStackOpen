import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [inp, setInp] = useState("");

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(inp.toLowerCase().trim()))

  

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((resp) => setCountries(resp.data));
  }, []);

  return (
    <>
      <label htmlFor="country">Search country</label>
      <input onChange={(e) => setInp(e.target.value)} id="country" type="text" />
      <Countries countries={filteredCountries} onChoseCcountry={(country) => setInp(country)} />
    </>
  );
}

export default App;
