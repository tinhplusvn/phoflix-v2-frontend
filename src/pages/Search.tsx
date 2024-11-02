import { Alert, Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { searchMovie } from "../redux/asyncThunk/moviesThunk";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import MovieList from "../components/movie/MovieList";
import { Pagination, Stack } from "@mui/material";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import SkeletonPage from "../components/common/SkeletonPage";
import SearchIcon from "@mui/icons-material/Search";
import searchNotFoundImg from "../images/search-not-found.png";

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
  const params = useParams();
  const breadcrumbsPaths = ["Tìm kiếm", params.keyword as string];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(
      searchMovie({
        keyword: params.keyword as string,
        page: currentPage,
      })
    );
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
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
          color="primary"
        >
          <Typography startDecorator={<SearchIcon />} level="title-lg">
            {movies.length > 0
              ? `Tìm kiếm được ${totalItems} bộ phim phù hợp cho từ khoá "${params.keyword}"`
              : `Không tìm thấy phim phù hợp!`}
          </Typography>

          <Typography
            color="primary"
            level="title-sm"
          >{`Trang ${currentPage}`}</Typography>
        </Alert>

        {movies.length > 0 && !isLoading && (
          <>
            <MovieList movies={movies} />
            <Stack spacing={2} sx={{ marginTop: "24px", alignItems: "center" }}>
              <Pagination
                onChange={handleChange}
                count={totalPages}
                page={currentPage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </>
        )}

        {movies.length === 0 && !isLoading && (
          <Box
            sx={{
              width: {
                xs: "320px",
                md: "400px",
              },
              height: {
                xs: "320px",
                md: "480px",
              },
              backgroundImage: `url(${searchNotFoundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              margin: "auto",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Search;
