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

const MovieList = ({ movies }: any) => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {movies.length === 0 &&
          Array(18)
            .fill(null)
            .map((_, index) => (
              <Grid xs={6} sm={4} lg={2} md={3} key={index}>
                <AspectRatio ratio="3/4" sx={{ borderRadius: "12px" }}>
                  <Skeleton animation="wave" variant="overlay">
                    <img
                      alt=""
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    />
                  </Skeleton>
                </AspectRatio>
              </Grid>
            ))}
      </Grid>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {movies.length > 0 &&
          movies.map((movie: any, index: number) => (
            <Grid xs={6} sm={4} lg={2} md={3} key={index}>
              <MovieItem movie={movie} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
