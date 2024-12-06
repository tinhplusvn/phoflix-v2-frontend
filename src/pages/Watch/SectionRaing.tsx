import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUser } from "../../interfaces/user";
import { AppDispatch, RootState } from "../../redux/store";
import { addMovieRating, getRatings } from "../../redux/asyncThunk/ratingThunk";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import { addActivityLog } from "../../redux/asyncThunk/activityLogThunk";
import { Alert, Box, Chip, Skeleton, Typography } from "@mui/joy";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { Rating } from "@mui/material";


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


export default SectionRating;