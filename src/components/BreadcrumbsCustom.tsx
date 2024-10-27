import { Box, Breadcrumbs, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const BreadcrumbsCustom = ({ paths }: { paths: string[] }) => {
  return (
    <Box sx={{ marginBottom: "32px" }}>
      <Breadcrumbs
        sx={{ padding: 0, alignItems: "center" }}
        separator="›"
        aria-label="breadcrumbs"
      >
        <Link
          style={{
            textDecoration: "none",
            color: 'inherit',
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          color="primary"
          to="/"
        >
          <HomeIcon />
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
