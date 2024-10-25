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
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      //   Chờ 10 giây
        // await delay(1000000);
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
    let { describe, slug, page } = rawData;
    try {
      const baseApi = `${process.env.REACT_APP_API_BASE}/${describe}/${slug}`;

      const response =
        describe !== "nam"
          ? await fetch(`${baseApi}?page=${page}&limit=24` as string)
          : await fetch(baseApi as string);

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (keyword: string) => {
    try {
      const baseApi = `${process.env.REACT_APP_API_TIM_KIEM}?keyword=${keyword}&limit=24`;

      const response = await fetch(baseApi);

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
