import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'
// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },

    voteAnecdote(state, action) {
      const votedAnecdote = state.find((anec) => anec.id === action.payload);
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "NEW_ANECDOTE":
//       return [...state, action.payload];

//     case "VOTE": {
//       const votedAnecdote = state.find((anec) => anec.id === action.payload);
//       const updatedAnecdote = {
//         ...votedAnecdote,
//         votes: votedAnecdote.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
//       );
//     }
//   }
//   return state;
// };

// export const addAnecdote = (anecdote) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       id: getId(),
//       content: anecdote,
//       votes: 0,
//     },
//   };
// };

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}
  
export default anecdoteSlice.reducer;
