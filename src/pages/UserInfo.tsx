import { Box, Button, Divider, Grid, Table, Typography } from "@mui/joy";
import backgroundMovieImg from "../images/background-movie.jpg";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import ModalEditUserInfo from "../components/modals/ModalEditUserInfo";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import avatarImg from "../images/avatar.jpg";
import { useNavigate } from "react-router-dom";
import {
  getActivityLog,
  deleleActivityLog,
} from "../redux/asyncThunk/activityLogThunk";
import { formatDate } from "../utils";

const UserInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const [openModalEditUserInfo, setOpenModalEditUserInfo] =
    useState<boolean>(false);
  const [openModalAlertDialog, setOpenModalAlertDialog] =
    useState<boolean>(false);
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  const activityList = useSelector(
    (state: RootState) => state.activityLog.activityList
  );

  useEffect(() => {
    if (!user.refresh_token) {
      navigate("/");
    }

    dispatch(getActivityLog(user.id as string));
  }, []);

  const handleDeleteActivityHistory = async () => {
    await dispatch(deleleActivityLog());
    await dispatch(getActivityLog(user.id as string));
    setOpenModalAlertDialog(false);
  };

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
            <img src={user.img ? user?.avatar : avatarImg} alt="Ảnh đại diện" />
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
                <Typography level="body-md">{user.username}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Email:</Typography>
                <Typography level="body-md">{user.email}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Số điện thoại:</Typography>
                <Typography level="body-md">
                  {user.phone_number || "Trống"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Giới tính:</Typography>
                <Typography level="body-md">{user.gender}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography level="body-md">Địa chỉ:</Typography>
                <Typography level="body-md">
                  {user.address || "Trống"}
                </Typography>
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
              {activityList.length > 0 && (
                <Button
                  onClick={() => setOpenModalAlertDialog(true)}
                  size="sm"
                  color="danger"
                >
                  Xoá lịch sử
                </Button>
              )}
            </Box>
            <Table sx={{ marginTop: "12px" }} aria-label="basic table">
              <thead>
                <tr>
                  <th style={{ width: "75%" }}>Tên hoạt động</th>
                  <th style={{ width: "25%" }}>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {activityList.length === 0 && (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      Lịch sử hoạt động đang trống!
                    </td>
                  </tr>
                )}
                {activityList.length > 0 &&
                  activityList.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item?.action}</td>
                      <td>{formatDate(item?.createdAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Box>
        </Grid>
      </Grid>

      <ModalEditUserInfo
        open={openModalEditUserInfo}
        setOpen={setOpenModalEditUserInfo}
        dataUser={user}
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
