import { Box, Skeleton } from "@mui/joy";
import SkeletonMovie from "./SkeletonMovies";

const SkeletonPage = () => {
  return (
    <Box sx={{ display: "flex", gap: "24px", flexDirection: "column" }}>
      <Skeleton variant="text" level="h4" width="50%" />
      <Skeleton variant="text" level="h1" />
      <SkeletonMovie quantity={18} />
    </Box>
  );
};
export default SkeletonPage;
