const CountriesItem = ({ name, capital, area, languages, flag }) => {
  return (
    <>
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
      </div>
      <div>
        <h4>languages:</h4>
        
      </div>
    </>
  );
};

export default CountriesItem;
