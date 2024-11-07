import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/movie/MovieList";
import { useEffect, useState } from "react";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import {
  deleteAllMovie,
  deleteMovie,
  getAllMovies,
} from "../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";
import SkeletonPage from "../components/common/SkeletonPage";

const SavedMovie = () => {
  const savedMovies = useSelector(
    (state: RootState) => state.movies.savedMovies.movies
  );
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = ["Phim đã lưu"];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "saved-movies",
        })
      );
      setIsLoading(false);
    };

    handleInit();
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
          type: "saved-movies",
        })
      );
      toast.success(res?.payload.EM);
    }
  };

  const handleDeleteAll = async () => {
    setIsLoadingButton(true)
    const res: any = await dispatch(
      deleteAllMovie({
        userId: user.id as string,
        type: "saved-movies",
      })
    );

    setIsLoadingButton(false)

    if (+res.payload.EC === 0) {
      toast.success(res.payload.EM);
      setOpen(false);

      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "saved-movies",
        })
      );
    }
  };

  if (isLoading) {
    return <SkeletonPage page="saved-movies" />;
  }

  if (!isLoading && savedMovies.length === 0) {
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
        <MovieList
          movies={savedMovies}
          page="savedMovies"
          handleDeleteMovie={handleDeleteMovie}
        />
      </Box>

      <ModalAlertDialog
        isLoading={isLoadingButton}
        open={open}
        setOpen={setOpen}
        handleSubmit={handleDeleteAll}
        title="Xoá phim đã lưu"
        content="Tất cả phim đã lưu của bạn sẽ bị xoá vĩnh viễn?"
      />
    </>
  );
};

export default SavedMovie;
