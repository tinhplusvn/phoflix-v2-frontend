import { Box, Button, Chip, IconButton, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";

import "../styles/MovieItem.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import _NavLink from "./common/_NavLink";

const MovieItem = ({ movie }: any) => {
  const navigate = useNavigate();

  return (
    <Box className="movie-item">
      <Link to={`/thong-tin/${movie.slug}`}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={`https://phimimg.com/${movie.poster_url}`}
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
        <Button
          sx={{ marginTop: "12px", width: "100%" }}
          startDecorator={<PlayArrowRoundedIcon />}
          onClick={() => navigate(`/dang-xem/${movie.slug}`)}
          size="sm"
          variant="solid"
          color="primary"
        >
          Xem ngay
        </Button>
      </Box>
    </Box>
  );
};

export default MovieItem;
