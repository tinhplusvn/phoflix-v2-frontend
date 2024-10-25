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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params: any = useParams();
  const breadcrumbsPaths = ["Tìm kiếm", params.keyword];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(searchMovie(params.keyword));
  }, [params, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [params]);

  return (
    <>
      {!isLoading && <BreadcrumbsCustom paths={breadcrumbsPaths} />}
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {isLoading && (
          <p>
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: "360px", marginBottom: "24px" }}
            />
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
          </p>
        )}
        {!isLoading && (
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
              {}
            </Typography>
            {movies.length > 0 && (
              <Typography
                color="primary"
                level="title-sm"
              >{`Trang ${currentPage}`}</Typography>
            )}
          </Alert>
        )}

        <Box>
          <MovieList movies={movies} />
        </Box>

        {isLoading && (
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
    </>
  );
};

export default Search;
