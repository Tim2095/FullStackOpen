import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteLIst from "./components/AnecdoteLIst";
import FilterNotes from "./components/FilterNotes";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterNotes />
      <AnecdoteLIst />
      <AnecdoteForm />
    </div>
  );
};

export default App;
