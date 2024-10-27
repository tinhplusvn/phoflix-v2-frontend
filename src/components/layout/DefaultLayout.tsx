import { Box } from "@mui/joy";
import Navigation from "./Navigation/Navigation";

import "../../styles/DefaultLayout.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { scrollToTop } from "../../utils";

const DefaultLayout = ({ children }: { children: any }) => {
  const params = useParams();

  useEffect(() => scrollToTop(), [params]);

  return (
    <Box className="container-layout">
      <Navigation />
      <Box className="container-children">{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
