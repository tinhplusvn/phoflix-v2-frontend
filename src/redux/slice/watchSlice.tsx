import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  watchedEpisodes:
    JSON.parse(localStorage.getItem("watched-episodes") as string) ?? [],
};

export const watchSlice = createSlice({
  name: "watchSlice",
  initialState,
  reducers: {
    updateWatchedEpisodes: (state, action) => {
      console.log(action.payload);
      const index = state.watchedEpisodes.findIndex(
        (item: any) => item.slug === action.payload.slug
      );

      if (index === -1) {
        state.watchedEpisodes.push(action.payload);
      } else {
        state.watchedEpisodes[index] = action.payload;
      }

      localStorage.setItem(
        "watched-episodes",
        JSON.stringify(state.watchedEpisodes)
      );
    },

   
  },
});

// Action creators are generated for each case reducer function
export const { updateWatchedEpisodes } = watchSlice.actions;

export default watchSlice.reducer;
