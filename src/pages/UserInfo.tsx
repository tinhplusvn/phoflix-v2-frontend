import { Box, Button, Divider, Grid, Table, Typography } from "@mui/joy";
import backgroundMovieImg from "../images/background-movie.jpg";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import ModalEditUserInfo from "../components/modals/ModalEditUserInfo";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";

const UserInfo = () => {
  const [openModalEditUserInfo, setOpenModalEditUserInfo] =
    useState<boolean>(false);
  const [openModalAlertDialog, setOpenModalAlertDialog] =
    useState<boolean>(false);

  const handleDeleteActivityHistory = () => {};

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={12}>
          <Box
            sx={{
              position: "relative",
              marginBottom: "120px",
            }}
          >
            <Box
              sx={{
                borderRadius: "12px",
                width: "100%",
                height: {
                  xs: "260px",
                  md: "320px",
                },
                backgroundImage: `url(${backgroundMovieImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: {
                xs: "330px",
                md: "400px",
              },
              left: {
                xs: "50%",
                md: "16%",
              },
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "5px solid #ccc",
              overflow: "hidden",
              width: "160px",
              height: "160px",
            }}
          >
            <img
              src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
              alt="Ảnh đại diện"
            />
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <Typography
              startDecorator={<AccountCircleIcon />}
              level="title-lg"
              color="primary"
            >
              Thông tin người dùng
            </Typography>
            <Box
              sx={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Tên:</Typography>
                <Typography level="body-md">Phở</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Email:</Typography>
                <Typography level="body-md">phohoccode@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Số điện thoại:</Typography>
                <Typography level="body-md">07896593122</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Giới tính:</Typography>
                <Typography level="body-md">Nam</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Địa chỉ:</Typography>
                <Typography level="body-md">Việt nam</Typography>
              </Box>
              <Button
                onClick={() => setOpenModalEditUserInfo(true)}
                sx={{ marginTop: "12px" }}
              >
                Chỉnh sửa thông tin
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                startDecorator={<HistoryIcon />}
                level="title-lg"
                color="primary"
              >
                Lịch sử hoạt động
              </Typography>
              <Button
                onClick={() => setOpenModalAlertDialog(true)}
                size="sm"
                color="danger"
              >
                Xoá lịch sử
              </Button>
            </Box>
            <Table sx={{ marginTop: "12px" }} aria-label="basic table">
              <thead>
                <tr>
                  <th style={{ width: "75%" }}>Tên hoạt động</th>
                  <th style={{ width: "25%" }}>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Đăng nhập hệ thống</td>
                  <td>08:00 AM</td>
                </tr>
                <tr>
                  <td>Tìm kiếm phim "Frozen yoghurt"</td>
                  <td>08:15 AM</td>
                </tr>
                <tr>
                  <td>Xem trailer phim "Ice cream sandwich"</td>
                  <td>08:20 AM</td>
                </tr>
                <tr>
                  <td>Thêm "Eclair" vào danh sách yêu thích</td>
                  <td>08:30 AM</td>
                </tr>
                <tr>
                  <td>Đánh giá phim "Cupcake"</td>
                  <td>09:00 AM</td>
                </tr>
                <tr>
                  <td>Chia sẻ phim "Gingerbread" với bạn bè</td>
                  <td>09:15 AM</td>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Grid>
      </Grid>

      <ModalEditUserInfo
        open={openModalEditUserInfo}
        setOpen={setOpenModalEditUserInfo}
      />

      <ModalAlertDialog
        open={openModalAlertDialog}
        title="Xoá lịch sử hoạt động"
        content="Lịch sử hoạt động của bạn sẽ bị xoá!"
        setOpen={setOpenModalAlertDialog}
        handleSubmit={handleDeleteActivityHistory}
      />
    </>
  );
};

export default UserInfo;
