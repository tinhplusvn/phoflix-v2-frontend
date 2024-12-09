import { useDispatch, useSelector } from "react-redux";
import SlideList from "../components/slide/SlideList";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useMemo, useState } from "react";
import {
  getCartoon,
  getFeatureFilm,
  getSlideShow,
  getTelevisionSeries,
  getTvShows,
} from "../redux/asyncThunk/moviesThunk";
import { Box } from "@mui/joy";
import MovieList from "../components/movie/MovieList";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import TitleContainer from "../components/common/TitleContainer";
import toast from "react-hot-toast";
import MovieSuggestions from "../components/movie/MovieSuggestions";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const featureFilm = movies.featureFilm;
  const televisionSeries = movies.televisionSeries;
  const cartoon = movies.cartoon;
  const tvShows = movies.tvShows;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleInit = async () => {
      try {
        setIsLoading(true);

        await Promise.all([
          dispatch(getSlideShow()),
          dispatch(getFeatureFilm()),
          dispatch(getTelevisionSeries()),
          dispatch(getCartoon()),
          dispatch(getTvShows()),
        ]);
      } catch (error) {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
      } finally {
        setIsLoading(false);
      }
    };

    handleInit();
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SlideList />
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/phim-le"
          content="Phim lẻ"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={featureFilm} isLoading={isLoading} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/phim-bo"
          content="Phim bộ"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={televisionSeries} isLoading={isLoading} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/hoat-hinh"
          content="Hoạt hình"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={cartoon} isLoading={isLoading} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/tv-shows"
          content="Chương trình TV"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={tvShows} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default Home;
