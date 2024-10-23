import { createSlice } from "@reduxjs/toolkit";
import {
  getCountries,
  getCategories,
  getCartoon,
  getSlideShow,
  getFeatureFilm,
  getTelevisionSeries,
  getTvShows,
} from "../asyncThunk/moviesThunk";

export interface Categorys {
  slug: string;
  name: string;
}

export interface Countrys {
  slug: string;
  name: string;
}

export interface MoviesState {
  categories: Categorys[];
  countries: Countrys[];
  slideShow: any;
  televisionSeries: any;
  cartoon: any;
  featureFilm: any;
  tvShows: any;
  isLoading: boolean;
}

const initialState: MoviesState = {
  categories: [],
  countries: [],
  slideShow: {
    items: [],
    pagination: {},
  },
  featureFilm: {
    items: [],
    pagination: {},
    titlePage: "",
  },
  televisionSeries: {
    items: [],
    pagination: {},
    titlePage: "",
  },
  cartoon: {
    items: [],
    pagination: {},
    titlePage: "",
  },
  tvShows: {
    items: [],
    pagination: {},
    titlePage: "",
  },
  isLoading: false,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getCountries.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.isLoading = false;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getSlideShow.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSlideShow.fulfilled, (state, action) => {
        state.slideShow.items = action.payload.items;
        state.isLoading = false;
      })
      .addCase(getSlideShow.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getFeatureFilm.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeatureFilm.fulfilled, (state, action) => {
        state.featureFilm.items = action.payload.data.items;
        state.featureFilm.pagination = action.payload.data.params.pagination;
        state.featureFilm.titlePage = action.payload.data.titlePage;
        state.isLoading = false;
      })
      .addCase(getFeatureFilm.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getTelevisionSeries.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTelevisionSeries.fulfilled, (state, action) => {
        state.televisionSeries.items = action.payload.data.items;
        state.televisionSeries.pagination =
          action.payload.data.params.pagination;
        state.televisionSeries.titlePage = action.payload.data.titlePage;
        state.isLoading = false;
      })
      .addCase(getTelevisionSeries.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getCartoon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartoon.fulfilled, (state, action) => {
        state.cartoon.items = action.payload.data.items;
        state.cartoon.pagination = action.payload.data.params.pagination;
        state.cartoon.titlePage = action.payload.data.titlePage;
        state.isLoading = false;
      })
      .addCase(getCartoon.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getTvShows.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.tvShows.items = action.payload.data.items;
        state.tvShows.pagination = action.payload.data.params.pagination;
        state.tvShows.titlePage = action.payload.data.titlePage;
        state.isLoading = false;
      })
      .addCase(getTvShows.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
