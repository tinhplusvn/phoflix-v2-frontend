import { Box, Button, Chip, IconButton, Tooltip, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/MovieItem.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import _NavLink from "../common/_NavLink";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "../../interfaces/movie";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteMovie, getAllMovies } from "../../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";

interface IProps {
  movie: IMovie;
  page: string;
}

const MovieItem = ({ movie, page }: IProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRemoveFromViewingHisotry = async (slug: string) => {
    const res: any = await dispatch(
      deleteMovie({
        userId: user?.id,
        movieSlug: slug ?? "",
        type: "watch-movies",
      })
    );

    if (+res?.payload.EC === 0) {
      toast.success(res?.payload.EM);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "watch-movies",
        })
      );
    }
  };

  const handleUnSaveMovie = async (slug: string) => {
    const res: any = await dispatch(
      deleteMovie({
        userId: user?.id,
        movieSlug: slug ?? "",
        type: "saved-movies",
      })
    );

    if (+res?.payload.EC === 0) {
      toast.success(res?.payload.EM);
      await dispatch(
        getAllMovies({
          userId: user.id as string,
          type: "saved-movies",
        })
      );
    }
  };

  return (
    <Box className="movie-item">
      <Link to={`/thong-tin/${movie.slug}`}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={
            (movie.poster_url as string).includes("https://phimimg.com/")
              ? movie.poster_url
              : `https://phimimg.com/${movie.poster_url}`
          }
          alt={movie.name}
        />
      </Link>
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          gap: "12px",
        }}
      >
        <Chip size="sm" variant="soft" color="neutral">
          {movie.lang}
        </Chip>
        <Chip size="sm" variant="soft" color="primary">
          {movie.time}
        </Chip>
      </Box>
      <Box className="movie-item-info">
        <Typography level="title-md">{movie.name}</Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "12px",
            gap: "12px",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Button
            sx={{ width: page ? "unset" : "100%" }}
            startDecorator={<PlayArrowRoundedIcon />}
            onClick={() => navigate(`/dang-xem/${movie.slug}`)}
            size="sm"
            variant="solid"
            color="primary"
          >
            Xem ngay
          </Button>
          {(page === "viewingHistory" || page === "savedMovies") && (
            <Tooltip
              title={
                page === "viewingHistory" ? "Xoá khỏi lịch sử" : "Bỏ lưu phim"
              }
            >
              <Button
                onClick={() =>
                  page === "viewingHistory"
                    ? handleRemoveFromViewingHisotry(movie.slug as string)
                    : handleUnSaveMovie(movie.slug as string)
                }
                color="danger"
                size="sm"
              >
                Xoá
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>
      {width < 1024 &&
        (page === "viewingHistory" || page === "savedMovies") && (
          <IconButton
            onClick={() =>
              page === "viewingHistory"
                ? handleRemoveFromViewingHisotry(movie.slug as string)
                : handleUnSaveMovie(movie.slug as string)
            }
            sx={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
            }}
            color="danger"
            size="sm"
            variant="solid"
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
    </Box>
  );
};

export default MovieItem;
