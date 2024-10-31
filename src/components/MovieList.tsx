import { Box, Grid } from "@mui/joy";
import MovieItem from "./MovieItem";
import _NavLink from "./common/_NavLink";
import SkeletonMovie from "./common/SkeletonMovies";
import { IMovie } from "../interfaces/movie";

interface IProps {
  movies: IMovie[];
  page?: string;
}

const MovieList = ({ movies, page }: IProps) => {

  if (movies.length === 0) {
    return <SkeletonMovie quantity={18} />;
  }

  return (
    <Box>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {movies.length > 0 &&
          movies.map((movie: IMovie, index) => (
            <Grid xs={6} sm={4} lg={2} md={3} key={index}>
              <MovieItem movie={movie} page={page as string} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
