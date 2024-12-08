import { Alert, Button, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface IProps {
  path: string;
  content: string;
  icon: React.ReactNode;
}

const TitleContainer = ({ path, content, icon }: IProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Alert
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "24px 0",
      }}
    >
      <Typography
        startDecorator={icon}
        color="neutral"
        level={isMobile ? "title-md" : "title-lg"}
      >
        {content}
      </Typography>
      <Button size="sm" variant="outlined" onClick={() => navigate(path)}>
        Xem thêm
      </Button>
    </Alert>
  );
};

export default TitleContainer;
