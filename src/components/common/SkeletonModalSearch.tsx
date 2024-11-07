import { Box, Skeleton } from "@mui/joy";

const SkeletonModalSearch = () => {
  return (
    <Box>
      <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
      <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
      <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
    </Box>
  );
};

export default SkeletonModalSearch;
