import {
  Alert,
  AspectRatio,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/joy";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addMovie, getMovieInfo } from "../redux/asyncThunk/moviesThunk";
import { useParams } from "react-router-dom";
import { copyText, scrollToTop } from "../utils";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModalInstructDowload from "../components/modals/ModalInstructDowload";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SkeletonPage from "../components/common/SkeletonPage";
import { Rating } from "@mui/material";
import MovieSuggestions from "../components/movie/MovieSuggestions";
import { updateWatchedEpisodes } from "../redux/slice/watchSlice";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CommentSection from "../components/comment/CommentSection";
import { addMovieRating, getRatings } from "../redux/asyncThunk/ratingThunk";
import toast from "react-hot-toast";
import { addActivityLog } from "../redux/asyncThunk/activityLogThunk";
import { IUser } from "../interfaces/user";
import ToggleShowItem from "../components/common/ToggleShowItem";
import { socket } from "../socket";

type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

type TypeCopy = "not-copy" | "copied";

const Watch = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const isError = useSelector((state: RootState) => state.movies.isError);
  const episodesFromStore = useSelector(
    (state: RootState) => state.movies.movieInfo.episodes
  );

  const watchedEpisodes = useSelector(
    (state: RootState) => state.watch.watchedEpisodes
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [typeShowEpisodes, setTypeShowEpisodes] = useState<string>("collapse");
  const params = useParams();
  const [currentEpisode, setCurrentEpisode] = useState<Episode>({
    name: "",
    slug: "",
    filename: "",
    link_embed: "",
    link_m3u8: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = [
    "Đang xem",
    currentEpisode.filename.replace(`- ${currentEpisode.name}`, ""),
    currentEpisode.name,
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setEpisodes(episodesFromStore.slice(0, 50));
  }, [episodesFromStore]);

  useEffect(() => {
    if (movieInfo?.name && movieInfo?.origin_name) {
      document.title = `Đang xem ${movieInfo.name} - ${movieInfo.origin_name}`;
    }
  }, [movieInfo]);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(getMovieInfo(params.slug as string));
      setIsLoading(false);
    };
    handleInit();
  }, [params?.slug]);

  useEffect(() => {
    if (user?.access_token || user?.refresh_token) {
      if (movieInfo?.slug) {
        dispatch(
          addMovie({
            userId: user?.id as string,
            movieInfo,
            type: "watch-history",
          })
        );
      }
    }
  }, [user, movieInfo]);

  useEffect(() => {
    const currentEpisode = handleGetCurrentEpisodes();
    if (episodes?.length > 0) {
      if (!currentEpisode) {
        setCurrentEpisode(episodes[0]);
      } else {
        setCurrentEpisode(currentEpisode);
      }
    }
  }, [episodes, movieInfo]);

  const handleGetCurrentEpisodes = () => {
    const objCurrentEpisodes: any = watchedEpisodes.find(
      (item) => item.slug === params.slug
    );

    return objCurrentEpisodes?.currentEpisode;
  };

  const handleShowEpisodes = (episodes: Episode[], type: string) => {
    setEpisodes(episodes);
    setTypeShowEpisodes(type);
    type === "collapse" && scrollToTop();
  };

  const handleChangeEpisode = (item: Episode) => {
    setCurrentEpisode(item);
    scrollToTop();
    handleUpdateWatchedEpisodes(item);
  };

  const handleUpdateWatchedEpisodes = (item: Episode) => {
    dispatch(
      updateWatchedEpisodes({
        currentEpisode: item,
        slug: params.slug,
      })
    );
  };

  if (isLoading) {
    return <SkeletonPage page="info" />;
  }

  if (isError && !movieInfo?.slug) {
    return (
      <Typography level="title-lg" color="danger">
        Không tìm thấy thông tin phim!
      </Typography>
    );
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Alert>
          <Typography level="title-lg">{currentEpisode.filename}</Typography>
        </Alert>
        <Box
          sx={{
            width: "100%",
            height: { lg: "480px", xs: "260px" },
            borderRadius: "8px",
            border: "1px solid #aaa",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            src={currentEpisode.link_embed}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        </Box>

        <Alert
          sx={{ flexDirection: "column", alignItems: "start", gap: "24px" }}
        >
          <Typography
            startDecorator={<SubscriptionsOutlinedIcon />}
            level="title-lg"
          >
            Danh sách tập phim
          </Typography>
          <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {episodes.map((item: Episode, index: number) => (
              <Button
                sx={{ flex: "auto" }}
                key={index}
                variant={item.slug === currentEpisode.slug ? "solid" : "soft"}
                onClick={() => handleChangeEpisode(item)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          {episodesFromStore.length > 50 && (
            <Box sx={{ margin: "0 auto" }}>
              <ToggleShowItem
                type={typeShowEpisodes}
                data={episodesFromStore}
                quantity={50}
                text="tập phim"
                location="center"
                handleShowItem={handleShowEpisodes}
              />
            </Box>
          )}
        </Alert>

        <SectionRating />

        <SectionLinkM3U8
          link_m3u8={currentEpisode.link_m3u8 as string}
          setOpen={setOpen}
        />

        <Box sx={{ margin: "12px 0" }}>
          <Divider />
        </Box>

        <CommentSection />

        <Box sx={{ margin: "12px 0" }}>
          <Divider />
        </Box>

        <MovieSuggestions />
      </Box>

      <ModalInstructDowload open={open} setOpen={setOpen} />
    </>
  );
};
export default Watch;

interface IProps {
  link_m3u8: string;
  setOpen: (open: boolean) => void;
}

const SectionLinkM3U8 = ({ link_m3u8, setOpen }: IProps) => {
  const [typeCopy, setTypeCopy] = useState<TypeCopy>("not-copy");

  const handleCopyLinkM3U8 = (link_m3u8: string) => {
    copyText(link_m3u8);
    setTypeCopy("copied");
    toast.success("Đã sao chép liên kết!");
    setTimeout(() => setTypeCopy("not-copy"), 1000);
  };
  return (
    <Alert sx={{ flexDirection: "column", alignItems: "start" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Typography startDecorator={<LinkOutlinedIcon />} level="title-lg">
            Liên kết tải video
          </Typography>

          <Tooltip title="Hướng dẫn tải xuống">
            <IconButton size="sm" onClick={() => setOpen(true)}>
              <HelpOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {typeCopy === "not-copy" ? (
          <Tooltip title="Sao chép">
            <IconButton onClick={() => handleCopyLinkM3U8(link_m3u8 as string)}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Đã sao chép">
            <IconButton>
              <CheckOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Typography
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
        level="body-md"
      >
        {link_m3u8}
      </Typography>
    </Alert>
  );
};

const SectionRating = () => {
  const [stars, setStars] = useState<number>(0);
  const params = useParams();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();
  const rating = useSelector((state: RootState) => state.rating);
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRefreshRating = async () => {
    setIsLoading(true);
    await dispatch(
      getRatings({
        movieSlug: params.slug as string,
        userId: user?.id as string,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    socket.on("refreshRating", (res) => {
      if (res?.slug === params?.slug) {
        handleRefreshRating();
      }
    });

    return () => {
      socket.off("refreshRating");
    };
  }, []);

  useEffect(() => {
    if (user?.access_token || user?.refresh_token) {
      handleRefreshRating();
    }
  }, [user]);

  useEffect(() => {
    setStars(rating.ratingWidthUser);
  }, [rating]);

  const handleAddRating = async (stars: number) => {
    if (!user.access_token || !user.refresh_token) {
      toast.error("Vui lòng đăng nhập để đánh giá!");
      return;
    }

    setIsLoading(true);
    setStars(stars);
    const res = await dispatch(
      addMovieRating({
        userId: user?.id as string,
        movieSlug: params.slug as string,
        rating: stars,
      })
    );

    if (+res.payload?.EC === 0) {
      await dispatch(
        addActivityLog({
          userId: user?.id as string,
          action: `Đánh giá ${stars} sao phim ${movieInfo.name}`,
        })
      );
      toast.success("Cảm ơn bạn đã đánh giá phim!");

      socket.emit("addRating", { slug: params?.slug });
    } else {
      toast.error(res.payload?.EM);
    }
    setIsLoading(false);
  };

  return (
    <Alert
      sx={{
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Typography startDecorator={<PollOutlinedIcon />} level="title-lg">
          Đánh giá phim
        </Typography>
        {isLoading ? (
          <Skeleton variant="text" level="body-xs" width={50} height={20} />
        ) : (
          <Chip color="primary">{rating.averageRating}/5 sao</Chip>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flex: "1",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton variant="text" level="h3" width={100} />
            <Skeleton variant="text" level="body-xs" width={100} height={20} />
          </>
        ) : (
          <>
            <Rating
              onChange={(event, value) => handleAddRating(value as number)}
              name="half-rating"
              value={stars}
              precision={1}
            />
            <Typography level="title-sm" color="neutral">
              {rating.countRating} lượt đánh giá
            </Typography>
          </>
        )}
      </Box>
    </Alert>
  );
};
