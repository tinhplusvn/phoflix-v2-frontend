import { Box } from "@mui/joy";
import Navigation from "./Navigation/Navigation";

import "../../styles/DefaultLayout.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { scrollToTop } from "../../utils";

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IProps) => {
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
