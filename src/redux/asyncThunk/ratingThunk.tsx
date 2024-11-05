import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";

export const getRatings = createAsyncThunk(
  "movies/getRatings",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/rating/get-ratings`,
        rawData
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
