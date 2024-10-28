import { Box, Button, Chip, Tooltip, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";

import "../styles/MovieItem.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import _NavLink from "./common/_NavLink";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { removeFromViewingHistory } from "../redux/slice/viewingHistorySlice";
import { unSaveMovie } from "../redux/slice/savedMoviesSlice";

const MovieItem = ({ movie, page }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleRemoveFromViewingHisotry = (slug: string) => {
    dispatch(removeFromViewingHistory(slug));
  };

  const handleUnSaveMovie = (slug: string) => {
    dispatch(unSaveMovie(slug));
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
            movie.poster_url.includes("https://phimimg.com/")
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
            justifyContent: "space-between",
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
                    ? handleRemoveFromViewingHisotry(movie.slug)
                    : handleUnSaveMovie(movie.slug)
                }
                color="danger"
              >
                Xoá
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MovieItem;
