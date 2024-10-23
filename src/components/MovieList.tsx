import {
  Alert,
  AspectRatio,
  Box,
  Button,
  Card,
  Grid,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useEffect } from "react";
import MovieItem from "./MovieItem";
import _NavLink from "./common/_NavLink";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
const MovieList = ({ movies, titlePage, path }: any) => {
  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <Box>
      <Alert
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "24px 0",
        }}
      >
        <Typography
          startDecorator={<LiveTvRoundedIcon />}
          color="neutral"
          level="h3"
        >
          {titlePage}
        </Typography>
        <Button variant="outlined">
          <_NavLink path={`/chi-tiet/${path}`} content="Xem thêm" />
          <ChevronRightRoundedIcon />
        </Button>
      </Alert>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "16px",
          margin: "0 -8px",
        }}
      >
        {movies.length === 0 &&
          Array(18)
            .fill(null)
            .map((_, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  width: " calc(16.66667% - 50px)",
                  display: "flex",
                  gap: 2,
                  margin: "0 8px",
                  height: "280px",
                }}
              >
                <AspectRatio sx={{ width: "100%", height: "100%" }}>
                  <Skeleton variant="overlay">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    />
                  </Skeleton>
                </AspectRatio>

                <Skeleton variant="text" level="h2" />
                <Skeleton variant="text" level="h2" />
                <Skeleton variant="text" level="h4" />
                <Skeleton variant="text" level="h1" />
              </Card>
            ))}
        {movies.length > 0 &&
          movies.map((movie: any, index: number) => (
            <MovieItem key={index} movie={movie} />
          ))}
      </Box>
    </Box>
  );
};

export default MovieList;
