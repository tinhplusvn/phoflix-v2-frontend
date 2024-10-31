import { createSlice } from "@reduxjs/toolkit";
 
export interface IComments {
  name: string;
  content: string;
}

const initialState: IComments[] =
  JSON.parse(localStorage.getItem("comments") as string) ?? [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem("comments", JSON.stringify(state));
    },
    removeComment: (state, action) => {
      state.splice(action.payload, 1);
      localStorage.setItem("comments", JSON.stringify(state));
    },
    editComment: (state, action) => {
      state[action.payload.index].content = action.payload.content;
      localStorage.setItem("comments", JSON.stringify(state));
    },
    filterComment: (state, action) => {
      state.reverse();
    },
  },
  //   extraReducers:
});

// Action creators are generated for each case reducer function
export const { addComment, removeComment, editComment, filterComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
