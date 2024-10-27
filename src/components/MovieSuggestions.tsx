import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../redux/asyncThunk/moviesThunk";
import MovieList from "./MovieList";

type describe = "the-loai" | "quoc-gia";
interface listItem {
  slug: string;
  name: string;
}

interface Props {
  categories: listItem[];
  countries: listItem[];
}

const MovieSuggestions = ({ categories, countries }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movieDetail);
  const [value, setValue] = useState<string | null>(categories[0].slug);

  useEffect(() => {
    dispatch(
      getMovieDetail({
        describe: "the-loai",
        slug: categories[0].slug,
        page: 1,
      })
    );
  }, []);

  const handleChangeSuggestion = (slug: string, describe: describe) => {
    dispatch(
      getMovieDetail({
        describe: describe,
        slug: slug,
        page: 1,
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Alert
        color="neutral"
        sx={{
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
          },
        }}
      >
        <Typography level="title-lg">Gợi ý phim</Typography>
        <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ToggleButtonGroup
            value={value}
            onChange={(event, value) => {
              setValue(value);
            }}
          >
            {categories.map((item: any, index: number) => (
              <Button
                onClick={() => handleChangeSuggestion(item.slug, "the-loai")}
                key={index}
                value={item.slug}
                disabled={value === item.slug}
              >
                {item.name}
              </Button>
            ))}
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={value}
            onChange={(event, value) => {
              setValue(value);
            }}
          >
            {countries.map((item: any, index: number) => (
              <Button
                onClick={() => handleChangeSuggestion(item.slug, "quoc-gia")}
                key={index}
                value={item.slug}
                disabled={value === item.slug}
              >
                {item.name}
              </Button>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Alert>

      <MovieList movies={movies.items} />
    </Box>
  );
};

export default MovieSuggestions;
