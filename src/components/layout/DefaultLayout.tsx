import { Box } from "@mui/joy";
import Navigation from "./Navigation/Navigation";

import "../../styles/DefaultLayout.scss";

const DefaultLayout = ({ children }: { children: any }) => {
  return (
    <Box className="container-layout">
      <Navigation />
      <Box className="container-children">{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
