import { Alert, Box, Typography } from "@mui/joy";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const SectionVideoPlayer = () => {
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );

  return (
    <>
      <Alert>
        <Typography level="title-lg">{currentEpisode.filename}</Typography>
      </Alert>
      <Box
        sx={{
          width: "100%",
          height: { lg: "480px", xs: "260px" },
          borderRadius: "8px",
          border: "1px solid rgba(61, 71, 81, 0.3)",
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
    </>
  );
};

export default SectionVideoPlayer;
