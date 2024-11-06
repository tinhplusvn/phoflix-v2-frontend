import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/movie/MovieList";
import { useEffect, useState } from "react";
import SkeletonPage from "../components/common/SkeletonPage";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import { deleteAllMovie, getAllMovies } from "../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";

const ViewingHistory = () => {
  const viewingHistory = useSelector(
    (state: RootState) => state.movies.viewingHistory.movies
  );
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = ["Lịch sử đã xem"];
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    dispatch(
      getAllMovies({
        userId: user.id as string,
        type: "watch-movies",
      })
    );
  }, []);

  const handleClearViewingHistory = async () => {
    const res: any = await dispatch(
      deleteAllMovie({
        userId: user.id as string,
        type: "watch-movies",
      })
    );

    if (+res.payload.EC === 0) {
      toast.success(res.payload.EM);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "watch-movies",
        })
      );
      setOpen(false)
    }
  };

  if (viewingHistory.length === 0) {
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
        <MovieList movies={viewingHistory} page="viewingHistory" />
      </Box>

      <ModalAlertDialog
        open={open}
        setOpen={setOpen}
        handleSubmit={handleClearViewingHistory}
        title="Xoá lịch sử đã xem"
        content="Lịch sử đã xem gần đây của bạn sẽ bị xoá vĩnh viễn?"
      />
    </>
  );
};

export default ViewingHistory;
