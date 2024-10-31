import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/movie";

const initialState: IMovie[] =
  JSON.parse(localStorage.getItem("saved-movied") as string) ?? [];

export const savedMovies = createSlice({
  name: "savedMovies",
  initialState,
  reducers: {
    savedMovie: (state, action) => {
      const movie = state.find((item) => item.slug === action.payload.slug);

      if (!movie) {
        state.push(action.payload);
        localStorage.setItem("saved-movied", JSON.stringify(state));
      }
    },
    unSaveMovie: (state, action) => {
      const index = state.findIndex((item) => item.slug === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("saved-movied", JSON.stringify(state));
      }
    },
    clearSavedMovies: (state) => {
      state.splice(0, state.length);
      localStorage.setItem("saved-movied", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { savedMovie, unSaveMovie, clearSavedMovies } =
  savedMovies.actions;

export default savedMovies.reducer;
