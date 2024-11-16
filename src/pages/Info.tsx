import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieInfo,
} from "../redux/asyncThunk/moviesThunk";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import InfoRow from "../components/common/InfoRow";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";

import "../styles/Info.scss";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import MovieSuggestions from "../components/movie/MovieSuggestions";
import SkeletonPage from "../components/common/SkeletonPage";
import { IMovie } from "../interfaces/movie";
import toast from "react-hot-toast";
import { IUser } from "../interfaces/user";

const Info = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const movieInfo: IMovie = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const isError = useSelector((state: RootState) => state.movies.isError);
  const params = useParams();
  const [isSave, setIsSave] = useState<boolean>(false);
  const breadcrumbsPaths = ["Thông tin phim", movieInfo.name];
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleInit = async () => {
      if (user?.access_token || user?.refresh_token) {
        await dispatch(
          getAllMovies({
            userId: user?.id as string,
            type: "saved-movies",
          })
        );
      }
      setIsLoading(true)
      await dispatch(getMovieInfo(params.slug as string));
      setIsLoading(false)
    };

    handleInit();
  }, [params]);

  if (isLoading) {
    return <SkeletonPage page="info" />;
  }

  if (isError) {
    return (
      <Typography level="title-lg" color="danger">
        Không tìm thấy thông tin phim!
      </Typography>
    );
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths as string[]} />

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
        <SectionContentMovie content={movieInfo.content as string} />

        {movieInfo?.trailer_url && (
          <SectionTrailerMovie trailer_url={movieInfo.trailer_url} />
        )}

        <Divider />

        {Object.keys(movieInfo).length > 0 && (
          <MovieSuggestions
            categories={movieInfo.category ?? []}
            countries={movieInfo.country ?? []}
          />
        )}
      </Box>
    </>
  );
};

export default Info;

interface ISectionCardMovie {
  movieInfo: IMovie;
  navigate: any;
  isSave: boolean;
  setIsSave: (isSave: boolean) => void;
}

const SectionCardMovie = ({
  movieInfo,
  navigate,
  isSave,
  setIsSave,
}: ISectionCardMovie) => {
  const dispatch: AppDispatch = useDispatch();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const params = useParams();
  const savedMovies = useSelector(
    (state: RootState) => state.movies.savedMovies.movies
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const width = useSelector((state: RootState) => state.system.width);

  useEffect(() => {
    const isExist: boolean = savedMovies.some(
      (item: any) => item.slug === params.slug
    );
    setIsSave(isExist);
  }, []);

  const handleSaveMovie = async () => {
    if (!user.access_token || !user.refresh_token) {
      toast.error("Vui lòng đăng nhập để lưu phim!");
      return;
    }

    setIsLoading(true);
    const res: any = await dispatch(
      addMovie({
        userId: user?.id as string,
        movieInfo,
        type: "saved-movies",
      })
    );

    if (+res?.payload.EC === 0) {
      toast.success(res?.payload.EM);
      setIsSave(!isSave);
    }
    setIsLoading(false);
  };

  const handleUnSaveMovie = async () => {
    setIsLoading(true);
    const res: any = await dispatch(
      deleteMovie({
        userId: user?.id as string,
        movieSlug: movieInfo?.slug as string,
        type: "saved-movies",
      })
    );

    if (+res?.payload.EC === 0) {
      toast.success(res?.payload.EM);
      setIsSave(!isSave);
    }
    setIsLoading(false);
  };

  return (
    <Box className="section-card-movie">
      <Box className="section-card-movie-inner">
        <img
          src={width ? movieInfo.poster_url : movieInfo?.thumb_url}
          alt={movieInfo.name}
        />
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
              loading={isLoading}
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
              loading={isLoading}
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
        <Typography level="h4" color="primary">
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
          label="Quốc gia:"
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
        <Typography startDecorator={<ArticleOutlinedIcon />} level="title-lg">
          Nội dung phim
        </Typography>
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
        <Typography startDecorator={<YouTubeIcon />} level="h4">
          Trailer phim
        </Typography>
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
