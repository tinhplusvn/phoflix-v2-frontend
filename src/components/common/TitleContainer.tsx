import { Alert, Button, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import React from "react";

interface IProps {
  path: string;
  content: string;
  icon: React.ReactNode;
}

const TitleContainer = ({ path, content, icon }: IProps) => {
  const navigate = useNavigate();

  return (
    <Alert
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "24px 0",
      }}
    >
      <Typography startDecorator={icon} color="neutral" level="h3">
        {content}
      </Typography>
      <Button variant="outlined" onClick={() => navigate(path)}>
        Xem thêm
        <ChevronRightRoundedIcon />
      </Button>
    </Alert>
  );
};

export default TitleContainer;
