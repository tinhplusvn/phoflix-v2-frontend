import { Box, Button, IconButton, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

import "../styles/MovieItem.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import _NavLink from "./common/_NavLink";

const MovieItem = ({ movie }: any) => {
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
            gap: "12px",
            marginTop: "12px",
            justifyContent: 'space-between'
          }}
        >
          <Button size="md" variant="solid" color="primary">
            <_NavLink path="/" content="Xem ngay" />
          </Button>
          <Button size="md" variant="soft" color="neutral">
            <_NavLink path="/" content="Chi tiết" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieItem;
