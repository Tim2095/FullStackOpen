import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdotesService from '../services/anecdotes'
const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0);

  const dispatch = useDispatch();

  const addNewAnecdote = async (e) => {
    e.preventDefault();

    const newAnecdote = await(anecdotesService.createNew({
      id: getId(),
      content: e.target.anecdote.value,
      votes: 0
    }))

    // dispatch(createAnecdote(newAnecdote))
    dispatch(addAnecdote(newAnecdote))
    e.target.anecdote.value = ''
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
