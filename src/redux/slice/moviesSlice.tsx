import { createSlice } from "@reduxjs/toolkit";
import {
  getCountries,
  getCategories,
  getCartoon,
  getSlideShow,
  getFeatureFilm,
  getTelevisionSeries,
  getTvShows,
  getMovieInfo,
  getMovieDetail,
  searchMovie,
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
  movieInfo: any;
  movieDetail: any;
  searchMovie: any;
  isLoading: boolean;
}

const initialState: MoviesState = {
  categories: [],
  countries: [],
  slideShow: {
    items: [],
    pagination: {},
  },
  featureFilm: [],
  televisionSeries: [],
  cartoon: [],
  tvShows: [],
  movieInfo: {},
  movieDetail: {
    items: [],
    titlePage: "",
    pagination: {
      totalItems: 0,
      totalPages: 0,
    },
  },
  searchMovie: {
    items: [],
    pagination: {
      totalItems: 0,
      totalPages: 0,
    },
  },
  isLoading: true,
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
        state.featureFilm = action.payload.data.items;
        state.isLoading = false;
      })
      .addCase(getFeatureFilm.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getTelevisionSeries.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTelevisionSeries.fulfilled, (state, action) => {
        state.televisionSeries = action.payload.data.items;
        state.isLoading = false;
      })
      .addCase(getTelevisionSeries.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getCartoon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartoon.fulfilled, (state, action) => {
        state.cartoon = action.payload.data.items;
        state.isLoading = false;
      })
      .addCase(getCartoon.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getTvShows.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.tvShows = action.payload.data.items;
        state.isLoading = false;
      })
      .addCase(getTvShows.rejected, (state, action) => {
        state.isLoading = false;
      })

      // lấy thông tin phim
      .addCase(getMovieInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        state.movieInfo = action.payload.movie;
        state.isLoading = false;
      })
      .addCase(getMovieInfo.rejected, (state, action) => {
        state.isLoading = false;
      })

      // chi tiết phim
      .addCase(getMovieDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        const { items, titlePage } = action.payload;
        const { totalItems, totalPages } = action.payload.params.pagination;
        state.movieDetail.items = items;
        state.movieDetail.titlePage = titlePage;
        state.movieDetail.pagination.totalItems = totalItems;
        state.movieDetail.pagination.totalPages = totalPages;
        state.isLoading = false;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.isLoading = false;
      })

      // tìm kiếm phim
      .addCase(searchMovie.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        const { items } = action.payload;
        const { totalItems, totalPages } = action.payload.params.pagination;
        state.searchMovie.items = items;
        state.searchMovie.pagination.totalItems = totalItems;
        state.searchMovie.pagination.totalPages = totalPages;
        state.isLoading = false;
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
