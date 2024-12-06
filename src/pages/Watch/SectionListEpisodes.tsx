import { Alert, Box, Button, Typography } from "@mui/joy";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ToggleShowItem from "../../components/common/ToggleShowItem";
import { Episode } from "./Watch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { scrollToTop } from "../../utils";
import {
  setCurrentEpisode,
  updateWatchedEpisodes,
} from "../../redux/slice/watchSlice";
import { useParams } from "react-router-dom";

const SectionListEpisodes = () => {
  const episodesFromStore = useSelector(
    (state: RootState) => state.movies.movieInfo.episodes
  );
  const watchedEpisodes = useSelector(
    (state: RootState) => state.watch.watchedEpisodes
  );
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [typeShowEpisodes, setTypeShowEpisodes] = useState<string>("collapse");
  const currentEpisode = useSelector((state: RootState) => state.watch.currentEpisode);

  useEffect(() => {
    setEpisodes(episodesFromStore.slice(0, 50));
  }, [episodesFromStore]);

  useEffect(() => {
    const currentEpisode = handleGetCurrentEpisodes();
    if (episodes?.length > 0) {
      if (!currentEpisode) {
        dispatch(setCurrentEpisode(episodes[0]));
      } else {
        dispatch(setCurrentEpisode(currentEpisode));
      }
    }
  }, [episodes, movieInfo]);

  const handleGetCurrentEpisodes = () => {
    const objCurrentEpisodes: any = watchedEpisodes.find(
      (item) => item.slug === params.slug
    );

    return objCurrentEpisodes?.currentEpisode;
  };

  const handleShowEpisodes = (episodes: Episode[], type: string) => {
    setEpisodes(episodes);
    setTypeShowEpisodes(type);
    type === "collapse" && scrollToTop();
  };

  const handleChangeEpisode = (item: Episode) => {
    dispatch(setCurrentEpisode(item));
    scrollToTop();
    handleUpdateWatchedEpisodes(item);
  };

  const handleUpdateWatchedEpisodes = (item: Episode) => {
    dispatch(
      updateWatchedEpisodes({
        currentEpisode: item,
        slug: params.slug,
      })
    );
  };

  return (
    <Alert sx={{ flexDirection: "column", alignItems: "start", gap: "24px" }}>
      <Typography
        startDecorator={<SubscriptionsOutlinedIcon />}
        level="title-lg"
      >
        Danh sách tập phim
      </Typography>
      <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {episodes.map((item: Episode, index: number) => (
          <Button
            sx={{ flex: "auto" }}
            key={index}
            variant={item.slug === currentEpisode.slug ? "solid" : "soft"}
            onClick={() => handleChangeEpisode(item)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      {episodesFromStore.length > 50 && (
        <Box sx={{ margin: "0 auto" }}>
          <ToggleShowItem
            type={typeShowEpisodes}
            data={episodesFromStore}
            quantity={50}
            text="tập phim"
            location="center"
            handleShowItem={handleShowEpisodes}
          />
        </Box>
      )}
    </Alert>
  );
};

export default SectionListEpisodes;
