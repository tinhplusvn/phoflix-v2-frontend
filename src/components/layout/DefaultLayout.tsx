import { Box } from "@mui/joy";
import Navigation from "./Navigation/Navigation";

const DefaultLayout = ({ children }: { children: any }) => {
  return (
    <Box sx={{ maxWidth: "100vw", overflow: "hidden" }}>
      <Navigation />
      <Box
        sx={{
          display: "flex",
          padding: "32px",
          gap: "32px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DefaultLayout;
