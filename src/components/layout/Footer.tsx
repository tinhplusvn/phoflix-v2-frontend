import { Box, Grid, Typography } from "@mui/joy";
import Link from "@mui/joy/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  return (
    <Box
      sx={{
        marginTop: "64px",
        padding: {
          xs: "16px",
          md: "64px 32px",
        },
        borderRadius: "16px 16px 0 0",
        background: "linear-gradient(to right, #a1c4fd96 0%, #c2e9fbb5 100%)",
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid md={12} lg={4}>
          <Typography sx={{ marginBottom: "12px" }} level="h4">
            Giới thiệu
          </Typography>
          <Typography level="title-md">
            Chào mừng bạn đến với PHOFLIX-V2, nơi trải nghiệm điện ảnh trực
            tuyến trở nên dễ dàng và thú vị hơn bao giờ hết! Tại đây, bạn sẽ
            khám phá hàng ngàn bộ phim đa dạng từ bom tấn Hollywood đến các tác
            phẩm nghệ thuật quốc tế và phim bộ truyền hình hấp dẫn. Với giao
            diện thân thiện, tốc độ tải nhanh và chất lượng HD sắc nét.
          </Typography>
        </Grid>
        <Grid md={12} lg={4}>
          <Typography sx={{ marginBottom: "12px" }} level="h4">
            Bản quyền
          </Typography>
          <Typography level="title-md">
            Tất cả nội dung của trang web này đều được tìm kiếm và thu thập ở
            các trang web phát video trực tuyến chính thống trên Internet, cũng
            như không cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn
            bị vi phạm, hãy liên hệ với chúng tôi. Chúng tôi sẽ xử lý và xóa các
            nội dung liên quan đó kịp thời. Xin cảm ơn!
          </Typography>
        </Grid>
        <Grid md={12} lg={4}>
          <Typography sx={{ marginBottom: "12px" }} level="h4">
            Liên hệ với tôi
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Link
              startDecorator={<GitHubIcon />}
              href="https://github.com/phohoccode"
            >
              Github
            </Link>
            <Link
              startDecorator={<TelegramIcon />}
              href="https://t.me/phohoccode"
            >
              Telegram
            </Link>
          </Box>
        </Grid>
        <Grid md={12}>
          <Typography
            sx={{ textAlign: "center", marginTop: "24px" }}
            level="title-md"
            color="primary"
          >
            © 2024 - Phát triển bởi phohoccode
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
