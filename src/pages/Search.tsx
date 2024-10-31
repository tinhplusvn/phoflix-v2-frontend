import {
  Alert,
  AspectRatio,
  Box,
  Button,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getMovieDetail, searchMovie } from "../redux/asyncThunk/moviesThunk";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import MovieList from "../components/MovieList";
import { Pagination, Stack } from "@mui/material";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import SkeletonMovie from "../components/common/SkeletonMovies";
import SkeletonPage from "../components/common/SkeletonPage";

const Search = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector(
    (state: RootState) => state.movies.searchMovie.items
  );
  const totalItems = useSelector(
    (state: RootState) => state.movies.searchMovie.pagination.totalItems
  );
  const totalPages = useSelector(
    (state: RootState) => state.movies.searchMovie.pagination.totalPages
  );

  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const isError = useSelector((state: RootState) => state.movies.isError);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams();
  const breadcrumbsPaths = ["Tìm kiếm", params.keyword as string];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(searchMovie(params.keyword as string));
  }, [params, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [params]);

  if (isLoading) {
    return <SkeletonPage page="search" />;
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Alert
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          color="primary"
        >
          <Typography startDecorator={<LiveTvRoundedIcon />} level="h4">
            {movies.length > 0
              ? `Tìm kiếm được ${totalItems} bộ phim phù hợp cho từ khoá "${params.keyword}"`
              : `Không tìm thấy phim phù hợp cho từ khoá "${params.keyword}"`}
          </Typography>

          <Typography
            color="primary"
            level="title-sm"
          >{`Trang ${currentPage}`}</Typography>
        </Alert>

        {movies.length > 0 && (
          <>
            <MovieList movies={movies} />
            <Stack spacing={2} sx={{ marginTop: "24px", alignItems: "center" }}>
              <Pagination
                onChange={handleChange}
                count={totalPages}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </>
        )}
      </Box>
    </>
  );
};

export default Search;
