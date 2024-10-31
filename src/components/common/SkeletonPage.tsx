import { Box, Skeleton } from "@mui/joy";
import SkeletonMovie from "./SkeletonMovies";

type Iprops = "info" | "watch" | "detail" | "search" | "viewing-history";

const SkeletonPage = ({ page }: { page: string }) => {
  return (
    <>
      {(page === "detail" ||
        page === "search" ||
        page === "viewing-history" ||
        page === "saved-movies") && (
        <Box sx={{ display: "flex", gap: "24px", flexDirection: "column" }}>
          <Skeleton variant="text" level="h4" width="50%" />
          <Skeleton variant="text" level="h1" />
          <SkeletonMovie quantity={18} />
        </Box>
      )}

      {(page === "info" || page === "watch") && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "23px",
          }}
        >
          <Skeleton animation="wave" variant="text" width="50%" />

          <Skeleton
            sx={{
              width: {
                xs: "calc(100vw - 32px)",
                md: "calc(100vw - 64px)",
              },
              height: "360px",
              borderRadius: "12px",
              marginTop: "64px",
            }}
            animation="wave"
            variant="overlay"
          />

          <Box sx={{ marginTop: "400px" }}>
            <Skeleton
              animation="wave"
              variant="text"
              level="h1"
              sx={{ width: "100%" }}
            />
            <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
            <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
            <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
          </Box>
        </Box>
      )}
    </>
  );
};
export default SkeletonPage;
