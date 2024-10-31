import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slice/moviesSlice";
import commentReducer from "./slice/commentsSlice";
import viewingHistoryReducer from "./slice/viewingHistorySlice";
import watchReducer from "./slice/watchSlice";
import savedMovieReducer from "./slice/savedMoviesSlice";
import systemReducer from "./slice/systemSlice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    movies: moviesReducer,
    comments: commentReducer,
    viewingHistory: viewingHistoryReducer,
    watch: watchReducer,
    savedMovies: savedMovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
