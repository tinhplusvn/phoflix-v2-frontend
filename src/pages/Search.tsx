import { Alert, Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { searchMovie } from "../redux/asyncThunk/moviesThunk";
import MovieList from "../components/movie/MovieList";
import { Experimental_CssVarsProvider, Pagination, Stack } from "@mui/material";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import SkeletonPage from "../components/common/SkeletonPage";
import SearchIcon from "@mui/icons-material/Search";
import searchNotFoundImg from "../images/search-not-found.png";
import { scrollToTop } from "../utils";
import _Pagination from "../components/common/_Pagination";

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
  const titleHead = useSelector(
    (state: RootState) => state.movies.searchMovie.titleHead
  );
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams();
  const breadcrumbsPaths = ["Tìm kiếm", params.keyword as string];

  useEffect(() => {
    document.title = titleHead;
  }, [titleHead]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    scrollToTop();
  };

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(
        searchMovie({
          keyword: params.keyword as string,
          page: currentPage,
        })
      );
      setIsLoading(false);
    };
    handleInit();
  }, [params?.keyword, currentPage]);

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
          color="neutral"
        >
          <Typography
            startDecorator={<SearchIcon />}
            level={isMobile ? "title-sm" : "title-md"}
          >
            {movies.length > 0
              ? `Tìm kiếm được ${totalItems} bộ phim phù hợp cho từ khoá "${params.keyword}"`
              : `Không tìm thấy phim phù hợp!`}
          </Typography>

          {movies.length > 0 && (
            <Typography
              color="neutral"
              level="title-sm"
            >{`Trang ${currentPage}`}</Typography>
          )}
        </Alert>

        {movies.length > 0 && !isLoading && (
          <>
            <MovieList movies={movies} />
            <_Pagination
              handleChange={handleChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </>
        )}

        {!isLoading && movies.length === 0 && (
          <Box
            sx={{
              width: "128px",
              height: "128px",
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
