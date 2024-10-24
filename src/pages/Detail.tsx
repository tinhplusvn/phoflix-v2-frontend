import { Alert, AspectRatio, Box, Button, Skeleton, Typography } from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getMovieDetail } from "../redux/asyncThunk/moviesThunk";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import MovieList from "../components/MovieList";
import { Pagination, Stack } from "@mui/material";

const Detail = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector(
    (state: RootState) => state.movies.movieDetail.items
  );
  const totalItems = useSelector(
    (state: RootState) => state.movies.movieDetail.pagination.totalItems
  );
  const totalPages = useSelector(
    (state: RootState) => state.movies.movieDetail.pagination.totalPages
  );
  const titlePage = useSelector(
    (state: RootState) => state.movies.movieDetail.titlePage
  );
  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const rawData = {
      describe: params.describe,
      slug: params.slug,
        page: currentPage,
    };
    dispatch(getMovieDetail(rawData));
  }, [params, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [params])

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {movies.length === 0 && (
        <Alert
          color="primary"
          sx={{
            height: "54px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Skeleton animation="wave" variant="text" sx={{ width: 240 }} />
          <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
        </Alert>
      )}
      {movies.length > 0 && (
        <Alert
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          color="primary"
        >
          <Typography startDecorator={<LiveTvRoundedIcon />} level="h4">
            {`${titlePage} (${totalItems} bộ)`}
          </Typography>
          <Typography
            color="primary"
            level="title-sm"
          >{`Trang ${currentPage}`}</Typography>
        </Alert>
      )}

      <Box>
        <MovieList movies={movies} />
      </Box>

      {movies.length === 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton sx={{ width: "300px" }} variant="text" level="h2" />
        </Box>
      )}
      {movies.length > 0 && (
        <Stack spacing={2} sx={{ marginTop: "24px", alignItems: "center" }}>
          <Pagination
            onChange={handleChange}
            count={totalPages}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </Box>
  );
};

export default Detail;
