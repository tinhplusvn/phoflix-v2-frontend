import { Box, Skeleton } from "@mui/joy";

const SkeletonModalSearch = () => {
  return (
    <Box sx={{ minHeight: "360px" }}>
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
    </Box>
  );
};

export default SkeletonModalSearch;
