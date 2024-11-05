import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";

export const getSearchHistory = createAsyncThunk(
  "movies/getSearchHistory",
  async (userId: string) => {
    try {
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/search-history/get-search-history/${userId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addSearchHistory = createAsyncThunk(
  "movies/addSearchHistory",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/search-history/add-search-history`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletSearchHistory = createAsyncThunk(
  "movies/deletSearchHistory",
  async (idSearchHistory: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/search-history/delete-search-history`,
        { idSearchHistory }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
