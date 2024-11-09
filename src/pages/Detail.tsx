import { Alert, Box, Typography } from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getMovieDetail } from "../redux/asyncThunk/moviesThunk";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import MovieList from "../components/movie/MovieList";
import { Pagination, Stack } from "@mui/material";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import _ from "lodash";
import SkeletonPage from "../components/common/SkeletonPage";
import { scrollToTop } from "../utils";

// định nghĩa kiểu dữ liệu cho object
type describe = Record<string, string>;
type slug = Record<string, string>;

const Detail = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.movies.categories);
  const countries = useSelector((state: RootState) => state.movies.countries);
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
  const titleHead = useSelector(
    (state: RootState) => state.movies.movieDetail.titleHead
  );
  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const isError = useSelector((state: RootState) => state.movies.isError);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams<{ describe: string; slug: string }>();
  const [describeMapping, setDescribeMapping] = useState<describe>({
    "the-loai": "Thể loại",
    "quoc-gia": "Quốc gia",
    "danh-sach": "Danh sách",
    nam: "Năm",
  });
  const [slugMapping, setSlugMapping] = useState<slug>({
    "phim-bo": "Phim bộ",
    "phim-le": "Phim lẻ",
    "hoat-hinh": "Hoạt hình",
    "tv-shows": "Tv shows",
  });
  const [breadcrumbsPaths, setBreadcrumbsPaths] = useState<string[]>([]);

  useEffect(() => {
    document.title = titleHead;
  }, [titleHead]);

  useEffect(() => {
    const categoryMapping = Object.fromEntries(
      categories.map((category) => [category.slug, category.name])
    );

    const countryMapping = Object.fromEntries(
      countries.map((country) => [country.slug, country.name])
    );

    setSlugMapping((prev) => ({
      ...prev,
      ...categoryMapping,
      ...countryMapping,
    }));
  }, [categories, countries]);

  useEffect(() => {
    setBreadcrumbsPaths([
      describeMapping[params.describe as string] || "Không xác định",
      slugMapping[params.slug as string] || "Không xác định",
    ]);
  }, [params, describeMapping, slugMapping]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    scrollToTop();
  };

  useEffect(() => {
    dispatch(
      getMovieDetail({
        describe: params.describe as string,
        slug: params.slug as string,
        page: currentPage,
      })
    );
  }, [params, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [params]);

  if (isLoading && !isError) {
    return <SkeletonPage page="detail" />;
  }

  if (!isLoading && isError) {
    return (
      <Typography level="title-lg" color="danger">
        Không tìm thấy thông tin phim!
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box>
        {movies.length > 0 && !isLoading && (
          <>
            <BreadcrumbsCustom paths={breadcrumbsPaths} />
            <Alert
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
              color="primary"
            >
              <Typography
                startDecorator={<LiveTvRoundedIcon />}
                level="title-lg"
              >
                {`${titlePage} (${totalItems} bộ)`}
              </Typography>
              <Typography
                color="primary"
                level="title-sm"
              >{`Trang ${currentPage}`}</Typography>
            </Alert>
          </>
        )}
      </Box>

      <MovieList movies={movies} />

      <Stack spacing={2} sx={{ marginTop: "24px", alignItems: "center" }}>
        <Pagination
          color="primary"
          page={currentPage}
          onChange={handleChange}
          count={totalPages}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default Detail;
