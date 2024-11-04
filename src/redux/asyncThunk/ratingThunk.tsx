import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";

export const getRatings = createAsyncThunk(
  "movies/getRatings",
  async (movie_slug: string) => {
    try {
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/rating/get-ratings/${movie_slug}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addMovieRating = createAsyncThunk(
  "movies/addMovieRating",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/rating/add-rating`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
