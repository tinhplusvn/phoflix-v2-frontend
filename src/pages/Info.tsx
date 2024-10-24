import { Box } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieInfo } from "../redux/asyncThunk/moviesThunk";

const Info = () => {
  const movieInfo = useSelector((state: RootState) => state.movies.movieInfo);
  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieInfo(params.slug));
  }, []);

  useEffect(() => {
    console.log(params);
    console.log(isLoading);
    console.log(movieInfo);
  }, [movieInfo]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Box sx={{display: 'flex'}}>

      </Box>
    </Box>
  );
};

export default Info;
