import { Box, Breadcrumbs, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

const BreadcrumbsCustom = ({ paths }: any) => {
  return (
    <Box sx={{ marginBottom: "24px" }}>
      <Breadcrumbs separator="›" aria-label="breadcrumbs">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          color="primary"
          to="/"
        >
          Trang chủ
        </Link>
        {paths.map((item: string, index: number) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsCustom;
