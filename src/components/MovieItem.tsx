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
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
          level="title-md"
        >
          {movie.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: "12px",
            flexDirection: "column",
          }}
        >
          <Button
            startDecorator={<PlayArrowRoundedIcon />}
            onClick={() => navigate(`/dang-xem/${movie.slug}`)}
            size="sm"
            variant="solid"
            color="primary"
          >
            Xem ngay
          </Button>
          <Button
            startDecorator={<InfoOutlinedIcon />}
            onClick={() => navigate(`/thong-tin/${movie.slug}`)}
            size="sm"
            variant="soft"
            color="neutral"
          >
            Chi tiết
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieItem;
