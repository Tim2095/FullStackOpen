import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const FilterNotes = () => {
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    dispatch(filterChange(e.target.value));
  };

  return <input name="filt" type="text" onChange={handleFilter} />;
};

export default FilterNotes;
