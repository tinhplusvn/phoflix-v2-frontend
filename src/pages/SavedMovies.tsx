import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/movie/MovieList";
import { useEffect, useState } from "react";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import { deleteAllMovie, getAllMovies } from "../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";

const SavedMovie = () => {
  const savedMovies = useSelector(
    (state: RootState) => state.movies.savedMovies.movies
  );
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = ["Phim đã lưu"];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      getAllMovies({
        userId: user.id as string,
        type: "saved-movies",
      })
    );
  }, []);

 
  const handleClearSavedMovie = async () => {
    const res: any = await dispatch(
      deleteAllMovie({
        userId: user.id as string,
        type: "saved-movies",
      })
    );

    if (+res.payload.EC === 0) {
      toast.success(res.payload.EM);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "saved-movies",
        })
      );
      setOpen(false)
    }
  };

  if (savedMovies.length === 0) {
    return (
      <Typography level="title-lg" color="primary">
        Chưa có bộ phim nào được lưu!
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
          <Typography startDecorator={<BookmarkAddedRoundedIcon />} level="h4">
            Phim đã lưu
          </Typography>
          <Button onClick={() => setOpen(true)} color="danger" variant="solid">
            Xoá tất cả
          </Button>
        </Alert>
        <MovieList movies={savedMovies} page="savedMovies" />
      </Box>

      <ModalAlertDialog
        open={open}
        setOpen={setOpen}
        handleSubmit={handleClearSavedMovie}
        title="Xoá phim đã lưu"
        content="Tất cả phim đã lưu của bạn sẽ bị xoá vĩnh viễn?"
      />
    </>
  );
};

export default SavedMovie;
