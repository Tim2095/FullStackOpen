import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Input from "./ui/input";
import Countries from "./components/Countries";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((resp) => setAllCountries(resp.data));
  }, []); 



  return (
    <div>
      <Countries countries={allCountries} />
    </div>
  );
};

export default App;
