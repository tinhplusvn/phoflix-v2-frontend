import {
  Alert,
  AspectRatio,
  Box,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieInfo } from "../redux/asyncThunk/moviesThunk";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import InfoRow from "../components/common/InfoRow";

import "../styles/Info.scss";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import MovieSuggestions from "../components/MovieSuggestions";
import SkeletonPage from "../components/common/SkeletonPage";
import { savedMovie, unSaveMovie } from "../redux/slice/savedMoviesSlice";

const Info = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const savedMovies = useSelector((state: RootState) => state.savedMovies);
  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const params: any = useParams();
  const [isSave, setIsSave] = useState<boolean>(false);
  const breadcrumbsPaths = ["Thông tin phim", movieInfo.name];

  useEffect(() => {
    const isExist = handleCheckSaveMovie();
    isExist && setIsSave(true);
  }, []);

  useEffect(() => {
    dispatch(getMovieInfo(params.slug));
  }, [params]);

  const handleCheckSaveMovie = () => {
    const isExist = savedMovies.some((item: any) => item.slug === params.slug);
    return isExist;
  };

  if (Object.keys(movieInfo).length === 0) {
    return <SkeletonPage page="info" />;
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />

      <Box className="info-container">
        <Box className="info-container-inner">
          <SectionCardMovie
            movieInfo={movieInfo}
            navigate={navigate}
            isSave={isSave}
            setIsSave={setIsSave}
          />

          <SectionInfoMovie movieInfo={movieInfo} />
        </Box>
        <SectionContentMovie content={movieInfo.content} />

        {movieInfo?.trailer_url && (
          <SectionTrailerMovie trailer_url={movieInfo.trailer_url} />
        )}

        <Divider/>

        <MovieSuggestions
          categories={movieInfo.category}
          countries={movieInfo.country}
        />
      </Box>
    </>
  );
};

export default Info;

const SectionCardMovie = ({ movieInfo, navigate, isSave, setIsSave }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSaveMovie = () => {
    dispatch(savedMovie(movieInfo));
    setIsSave(!isSave);
  };

  const handleUnSaveMovie = () => {
    console.log(movieInfo.slug);
    dispatch(unSaveMovie(movieInfo.slug));
    setIsSave(!isSave);
  };

  return (
    <Box className="section-card-movie">
      <Box className="section-card-movie-inner">
        <img src={movieInfo.poster_url} alt={movieInfo.name} />
      </Box>
      <Box className="section-card-movie-actions">
        <Button
          onClick={() => navigate(`/dang-xem/${movieInfo.slug}`)}
          startDecorator={<PlayArrowRoundedIcon />}
          variant="solid"
          color="primary"
        >
          Xem ngay
        </Button>
        {isSave ? (
          <Tooltip title="Xoá khỏi danh sách" variant="soft" color="danger">
            <IconButton
              onClick={() => handleUnSaveMovie()}
              variant="solid"
              color="danger"
            >
              <BookmarkRemoveOutlinedIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Thêm vào danh sách" variant="soft" color="primary">
            <IconButton
              onClick={() => handleSaveMovie()}
              variant="solid"
              color="neutral"
            >
              <BookmarkAddOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

const SectionInfoMovie = ({ movieInfo }: any) => {
  return (
    <Box className="section-info-movie">
      <Alert
        color="neutral"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography level="h3" color="primary">
          {movieInfo.name}
        </Typography>
        <Typography level="title-lg">{movieInfo.origin_name}</Typography>
      </Alert>

      <Alert
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "start",
        }}
        color="neutral"
      >
        <InfoRow
          canPress={false}
          type="only"
          label="Tình trạng:"
          value={movieInfo.episode_current}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Số tập:"
          value={movieInfo.episode_total}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Thời lượng:"
          value={movieInfo.time}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Năm phát hành:"
          value={movieInfo.year}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Chất lượng:"
          value={movieInfo.quality}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Ngôn ngữ:"
          value={movieInfo.lang}
        />

        <InfoRow
          canPress={false}
          type="many"
          label="Đạo diễn:"
          value={movieInfo.director}
        />
        <InfoRow
          describe="the-loai"
          canPress={true}
          type="many"
          label="Thể loại:"
          value={movieInfo.category}
        />
        <InfoRow
          describe="quoc-gia"
          canPress={true}
          type="many"
          label="Quốc gia"
          value={movieInfo.country}
        />
      </Alert>
    </Box>
  );
};

const SectionContentMovie = ({ content }: { content: string }) => {
  return (
    <Box>
      <Alert color="neutral">
        <Typography level="title-lg">Nội dung phim</Typography>
      </Alert>
      <Typography sx={{ padding: " 8px" }} level="body-lg">
        {content}
      </Typography>
    </Box>
  );
};

const SectionTrailerMovie = ({ trailer_url }: { trailer_url: string }) => {
  return (
    <Box>
      <Alert
        color="neutral"
        sx={{ flexDirection: "column", alignItems: "start" }}
      >
        <Typography level="h4">Trailer phim</Typography>
      </Alert>
      <Box
        sx={{
          width: "100%",
          height: "360px",
          borderRadius: "8px",
          overflow: "hidden",
          marginTop: "12px",
        }}
      >
        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer"
          referrerPolicy="strict-origin-when-cross-origin"
          src={trailer_url.replace("watch?v=", "/embed/")}
        ></iframe>
      </Box>
    </Box>
  );
};
