import { Box, Grid, Typography } from "@mui/joy";
import MovieItem from "./MovieItem";
import SkeletonMovie from "../common/SkeletonMovies";
import { IMovie } from "../../interfaces/movie";
import { useEffect, useState } from "react";
import searchNotFoundImg from "../../images/search-not-found.png";
import ShowBackground from "../common/ShowBackground";

interface IProps {
  movies: IMovie[];
  page?: string;
  isLoading?: boolean;
  handleDeleteMovie?: (slug: string, type: string) => void;
}

const MovieList = ({ movies, page, isLoading, handleDeleteMovie }: IProps) => {
  if (movies.length === 0 && isLoading) {
    return <SkeletonMovie quantity={18} />;
  }

  if (!isLoading && movies.length === 0) {
    return (
      <ShowBackground
        urlImage={searchNotFoundImg}
        content="Không tìm thấy kết quả nào!"
        color="danger"
      />
    );
  }

  return (
    <Box>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {movies.map((movie: IMovie, index) => (
          <Grid xs={6} sm={4} lg={2} md={3} key={index}>
            <MovieItem
              movie={movie}
              page={page as string}
              handleDeleteMovie={handleDeleteMovie}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
