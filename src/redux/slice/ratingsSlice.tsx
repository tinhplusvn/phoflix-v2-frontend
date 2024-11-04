import { createSlice } from "@reduxjs/toolkit";
import { getRatings } from "../asyncThunk/ratingThunk";

const initialState: any = {
  averageRating: 0,
  countRating: 0,
};

export const ratingSlice = createSlice({
  name: "ratingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRatings.pending, (state) => {})
      .addCase(getRatings.fulfilled, (state, action) => {
        console.log(action);
        state.averageRating = action.payload?.DT?.average_rating;
        state.countRating = action.payload?.DT?.count;
      })
      .addCase(getRatings.rejected, (state) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
