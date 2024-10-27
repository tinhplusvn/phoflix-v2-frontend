import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  ModalClose,
  Sheet,
  Tooltip,
  Typography,
} from "@mui/joy";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieInfo } from "../redux/asyncThunk/moviesThunk";
import { useParams } from "react-router-dom";
import { copyText, scrollToTop } from "../utils";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModalInstructDowload from "../components/ModalInstructDowload";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

type Episode = {
  name: string | undefined;
  slug: string | undefined;
  filename: string | undefined;
  link_embed: string | undefined;
  link_m3u8: string | undefined;
};

type TypeCopy = "not-copy" | "copied";

const Watch = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const episodes = useSelector(
    (state: RootState) => state.movies.movieInfo.episodes
  );
  const params = useParams();
  const [currentEpisode, setCurrentEpisode] = useState<Episode>({
    name: undefined,
    slug: undefined,
    filename: undefined,
    link_embed: undefined,
    link_m3u8: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [typeCopy, setTypeCopy] = useState<TypeCopy>("not-copy");

  useEffect(() => {
    dispatch(getMovieInfo(params.slug as string));
  }, []);

  useEffect(() => {
    if (episodes.length > 0) {
      setCurrentEpisode(episodes[0]);
    }
  }, [episodes, movieInfo]);

  const handleChangeEpisode = (item: Episode) => {
    setCurrentEpisode(item);
    scrollToTop();
  };

  const handleCopyLinkM3U8 = (link_m3u8: string) => {
    copyText(link_m3u8);
    setTypeCopy("copied");

    setTimeout(() => setTypeCopy("not-copy"), 1000);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Alert>
          <Typography level="title-lg">{currentEpisode.filename}</Typography>
        </Alert>
        <Box
          sx={{
            width: "100%",
            height: { lg: "540px", xs: "260px" },
            borderRadius: "8px",
            border: "1px solid #aaa",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            src={currentEpisode.link_embed}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        </Box>

        <Alert
          sx={{ flexDirection: "column", alignItems: "start", gap: "24px" }}
        >
          <Typography level="title-lg">Danh sách tập</Typography>
          <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {episodes.map((item: Episode, index: number) => (
              <Button
                key={index}
                variant={item.slug === currentEpisode.slug ? "solid" : "soft"}
                onClick={() => handleChangeEpisode(item)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Alert>

        <Alert sx={{ flexDirection: "column", alignItems: "start" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Typography level="title-lg">Liên kết M3U8</Typography>

              <Tooltip title="Hướng dẫn tải xuống">
                <IconButton size="sm" onClick={() => setOpen(true)}>
                  <HelpOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {typeCopy === "not-copy" ? (
              <Tooltip title="Sao chép">
                <IconButton
                  onClick={() =>
                    handleCopyLinkM3U8(currentEpisode.link_m3u8 as string)
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Đã sao chép">
                <IconButton>
                  <CheckOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
            level="body-md"
          >
            {currentEpisode.link_m3u8}
          </Typography>
        </Alert>
      </Box>

      <ModalInstructDowload open={open} setOpen={setOpen} />
    </>
  );
};
export default Watch;
