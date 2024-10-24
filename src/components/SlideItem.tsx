import { Box, Button, Chip, Typography } from "@mui/joy";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import _NavLink from "./common/_NavLink";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SlideItem = ({ item }: any) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        bottom: `${width > 1024 ? "48px" : "32px"}`,
        left: `${width > 1024 ? "48px" : "24px"}`,
        backdropFilter: `${width > 1024 ? "blur(8px)" : "unset"}`,
        backgroundColor: `${
          width > 1024 ? "rgba(255, 255, 255, 0.3)" : "unset"
        } `,
        border: `${width > 1024 ? "1px solid #aaa" : "unset"}`,
        padding: `${width > 1024 ? "16px" : "0"}`,
        borderRadius: "12px",
        gap: "24px",
        maxHeight: "200px",
        minWidth: "260px",
        maxWidth: "640px",
      }}
    >
      {width > 1024 && (
        <Box
          sx={{
            width: "160px",
            height: "160px",
            overflow: "hidden",
            borderRadius: "12px",
            border: '1px solid #aaa'
          }}
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={item.poster_url}
            alt={item.name}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            textAlign: "start",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "280px",
          }}
          color="primary"
          level="title-lg"
        >
          {item.name}
        </Typography>
        {width > 1024 && (
          <Typography
            sx={{
              color: "#000",
              textAlign: "start",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
            }}
            level="title-md"
          >
            {item.origin_name}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button
            onClick={() => navigate(`/dang-xem/${item.slug}`)}
            size={`${width > 1024 ? "md" : "sm"}`}
            color="primary"
            variant="solid"
            startDecorator={<PlayArrowRoundedIcon />}
          >
            Xem ngay
          </Button>
          <Button
            onClick={() => navigate(`/thong-tin/${item.slug}`)}
            size={`${width > 1024 ? "md" : "sm"}`}
            color="neutral"
            variant="soft"
            startDecorator={<InfoOutlinedIcon />}
          >
            Chi tiết
          </Button>
        </Box>
        <Chip size="sm" sx={{ marginTop: "12px" }} variant="soft" color="primary">
          Năm phát hành {item.year}
        </Chip>
      </Box>
    </Box>
  );
};

export default SlideItem;
