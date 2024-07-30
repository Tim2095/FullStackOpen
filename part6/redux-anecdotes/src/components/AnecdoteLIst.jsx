import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const Anecdote = ({ content, votes, id }) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const vote = async (id) => {
    // dispatch(voteAnecdote(id));

    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(setMessage(`You voted "${votedAnecdote.content}"`));
    const updatedAnecdote = await anecdoteService.updateLike(votedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote.id))

    setTimeout(() => {
      dispatch(setMessage(""));
    }, 5000);
  };

  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteLIst = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filt = useSelector((state) => state.filter);
  const filtered = anecdotes.filter((anecdote) => {
    const filteredAnec = anecdote.content
      .toLowerCase()
      .includes(filt.toLowerCase());
    return filteredAnec;
  });

  return (
    <div>
      {filtered
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <Anecdote
              id={anecdote.id}
              content={anecdote.content}
              votes={anecdote.votes}
            />
          </div>
        ))}
    </div>
  );
};

export default AnecdoteLIst;
