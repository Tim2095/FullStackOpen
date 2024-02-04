

const FilteredPersons = ({searchName, onSearchName}) => {
  return (
    <div>
      Filter: <input value={searchName} onChange={onSearchName} />
    </div>
  );
};

export default FilteredPersons;
