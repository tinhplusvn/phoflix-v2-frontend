import { useDispatch, useSelector } from "react-redux";
import SlideShow from "../components/SlideShow";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import {
  getCartoon,
  getFeatureFilm,
  getSlideShow,
  getTelevisionSeries,
  getTvShows,
} from "../redux/asyncThunk/moviesThunk";
import { Box } from "@mui/joy";
import MovieList from "../components/MovieList";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const featureFilm = useSelector(
    (state: RootState) => state.movies.featureFilm.items
  );
  const televisionSeries = useSelector(
    (state: RootState) => state.movies.televisionSeries.items
  );
  const cartoon = useSelector((state: RootState) => state.movies.cartoon.items);
  const tvShows = useSelector((state: RootState) => state.movies.tvShows.items);

  useEffect(() => {
    dispatch(getSlideShow());
    dispatch(getFeatureFilm());
    dispatch(getTelevisionSeries());
    dispatch(getCartoon());
    dispatch(getTvShows());
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SlideShow />
      <MovieList movies={featureFilm} titlePage="Phim lẻ" path="phim-le"  />
      <MovieList movies={televisionSeries} titlePage="Phim bộ" path="phim-bo"  />
      <MovieList movies={cartoon} titlePage="Hoạt hình" path="hoat-hinh"  />
      <MovieList
        movies={tvShows}
        titlePage="Chương trình truyền hình"
        path="tv-shows" 
      />
    </Box>
  );
};

export default Home;
