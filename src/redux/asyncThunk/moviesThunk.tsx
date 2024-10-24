import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "movies/getCategories",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_THE_LOAI as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCountries = createAsyncThunk(
  "movies/getCountries",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_QUOC_GIA as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSlideShow = createAsyncThunk(
  "movies/getSlideShow",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_PHIM_MOI_CAP_NHAT as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFeatureFilm = createAsyncThunk(
  "movies/getFeatureFilm",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PHIM_LE}?limit=24` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTelevisionSeries = createAsyncThunk(
  "movies/getTelevisionSeries",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PHIM_BO}?limit=24` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCartoon = createAsyncThunk("movies/getCartoon", async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOAT_HINH}?limit=24` as string
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getTvShows = createAsyncThunk("movies/getTvShows", async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_TV_SHOWS}?limit=24` as string
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async (slug: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_THONG_TIN_PHIM}/${slug}` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "movies/getMovieDetail",
  async (rawData: any) => {
    const { describe, slug, page } = rawData;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/${describe}/${slug}?page=${page}&limit=24` as string
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
