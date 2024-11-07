import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/movie/MovieList";
import { useEffect, useState } from "react";
import SkeletonPage from "../components/common/SkeletonPage";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import {
  deleteAllMovie,
  deleteMovie,
  getAllMovies,
} from "../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";

type TypeDelete = "watch-history" | "saved-movies";

const WatchHistory = () => {
  const watchHistory = useSelector(
    (state: RootState) => state.movies.watchHistory.movies
  );
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const breadcrumbsPaths = ["Lịch sử đã xem"];

  useEffect(() => {
    const hanldeInit = async () => {
      setIsLoading(true);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "watch-history",
        })
      );
      setIsLoading(false);
    };

    hanldeInit();
  }, []);

  const handleDeleteMovie = async (slug: string, type: string) => {
    const res: any = await dispatch(
      deleteMovie({
        userId: user?.id,
        movieSlug: slug ?? "",
        type,
      })
    );

    if (+res?.payload.EC === 0) {
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "watch-history",
        })
      );
      toast.success(res?.payload.EM);
    }
  };

  const handleDeleteAll = async () => {
    setIsLoadingButton(true);
    const res: any = await dispatch(
      deleteAllMovie({
        userId: user.id as string,
        type: "watch-history",
      })
    );

    setIsLoadingButton(false);

    if (+res.payload.EC === 0) {
      toast.success(res.payload.EM);
      setOpen(false);
      setIsLoading(true);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "watch-history",
        })
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonPage page="watch-history" />;
  }

  if (!isLoading && watchHistory.length === 0) {
    return (
      <Typography level="title-lg" color="primary">
        Lịch sử xem trống!
      </Typography>
    );
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
        >
          <Typography startDecorator={<HistoryOutlinedIcon />} level="h4">
            Lịch sử xem gần đây
          </Typography>
          <Button onClick={() => setOpen(true)} color="danger" variant="solid">
            Xoá lịch sử
          </Button>
        </Alert>
        <MovieList
          movies={watchHistory}
          page="watchHistory"
          handleDeleteMovie={handleDeleteMovie}
        />
      </Box>

      <ModalAlertDialog
        isLoading={isLoadingButton}
        open={open}
        setOpen={setOpen}
        handleSubmit={handleDeleteAll}
        title="Xoá lịch sử đã xem"
        content="Lịch sử đã xem gần đây của bạn sẽ bị xoá vĩnh viễn?"
      />
    </>
  );
};

export default WatchHistory;
