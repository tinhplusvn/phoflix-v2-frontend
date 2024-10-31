import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/movie";

const initialState: IMovie[] =
  JSON.parse(localStorage.getItem("viewing-history") as string) ?? [];

export const viewingHistorySlice = createSlice({
  name: "viewingHistory",
  initialState,
  reducers: {
    addViewingHistory: (state, action) => {
      const isExist = state.some((item) => item.slug === action.payload.slug);

      if (!isExist) {
        state.push(action.payload);
        localStorage.setItem("viewing-history", JSON.stringify(state));
      }
    },
    removeFromViewingHistory: (state, action) => {
      const index = state.findIndex((item) => item.slug === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("viewing-history", JSON.stringify(state));
      }
    },
    clearViewingHistory: (state) => {
      state.splice(0, state.length);
      localStorage.setItem("viewing-history", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addViewingHistory,
  clearViewingHistory,
  removeFromViewingHistory,
} = viewingHistorySlice.actions;

export default viewingHistorySlice.reducer;
