import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Table,
  Typography,
} from "@mui/joy";
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
import { formatDate, scrollToTop } from "../utils";
import SkeletonActivityLog from "../components/common/SkeletonActivityLog";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IUser } from "../interfaces/user";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const UserInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const [openModalEditUserInfo, setOpenModalEditUserInfo] =
    useState<boolean>(false);
  const [openModalAlertDialog, setOpenModalAlertDialog] =
    useState<boolean>(false);
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  const activityFromStore = useSelector(
    (state: RootState) => state.activityLog.activityList
  );
  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [typeShowActivity, setTypeShowActivity] = useState<string>("collapse");

  const handleShowEpisodes = (activity: any, type: string) => {
    setActivityList(activity);
    setTypeShowActivity(type);
    type === "collapse" && scrollToTop();
  };

  useEffect(() => {
    setActivityList(activityFromStore.slice(0, 10));
  }, [activityFromStore]);

  useEffect(() => {
    if (!user?.refresh_token || !user?.access_token) {
      navigate("/");
    }

    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(getActivityLog(user?.id as string));
      setIsLoading(false);
    };
    handleInit();
  }, []);

  const handleDeleteActivityHistory = async () => {
    setIsLoadingButton(true);
    await dispatch(deleleActivityLog(user?.id as string));
    await dispatch(getActivityLog(user?.id as string));
    setOpenModalAlertDialog(false);
    setIsLoadingButton(false);
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
            <img src={avatarImg} alt="Ảnh đại diện" />
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography
              startDecorator={<AccountCircleIcon />}
              level="title-lg"
              color="primary"
            >
              Thông tin người dùng
            </Typography>

            <Table sx={{ marginTop: "12px" }} aria-label="basic table">
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Tên:</td>
                  <td style={{ wordWrap: "break-word" }}>{user.username}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Email:</td>
                  <td style={{ wordWrap: "break-word" }}>{user.email}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Số điện thoại:</td>
                  <td style={{ wordWrap: "break-word" }}>
                    {user?.phone_number ?? "Không xác định"}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Giới tính:</td>
                  <td style={{ wordWrap: "break-word" }}>
                    {user.gender ?? "Không xác định"}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Địa chỉ:</td>
                  <td style={{ wordWrap: "break-word" }}>
                    {user.address ?? "Không xác định"}
                  </td>
                </tr>
              </tbody>
            </Table>

            <Button
              onClick={() => setOpenModalEditUserInfo(true)}
              startDecorator={<EditNoteIcon />}
              sx={{
                marginLeft: {
                  xs: "unset",
                  md: "auto",
                },
              }}
            >
              Chỉnh sửa thông tin
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          {isLoading && <SkeletonActivityLog />}
          {!isLoading && (
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
                        <Typography
                          sx={{ marginTop: "12px" }}
                          level="title-md"
                          color="primary"
                        >
                          Không có hoạt động nào gần đây!
                        </Typography>
                      </td>
                    </tr>
                  )}
                  {activityList.length > 0 &&
                    activityList.map((item: any, index: number) => (
                      <tr key={index}>
                        <td style={{ wordBreak: "break-word" }}>
                          {item?.action}
                        </td>
                        <td style={{ wordBreak: "break-word" }}>
                          {formatDate(item?.createdAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                {activityFromStore.length > 10 && (
                  <Box sx={{ marginTop: "12px" }}>
                    {typeShowActivity === "collapse" ? (
                      <Button
                        onClick={() =>
                          handleShowEpisodes(activityFromStore, "extend")
                        }
                        color="primary"
                        variant="plain"
                        endDecorator={<KeyboardArrowDownIcon />}
                      >
                        {`Hiển thị tất cả ${activityFromStore.length - 19}`}
                      </Button>
                    ) : (
                      <Button
                        variant="plain"
                        onClick={() =>
                          handleShowEpisodes(
                            activityFromStore.slice(0, 10),
                            "collapse"
                          )
                        }
                        color="primary"
                        endDecorator={<KeyboardArrowUpIcon />}
                      >
                        Thu gọn
                      </Button>
                    )}
                  </Box>
                )}
              </Table>
            </Box>
          )}
        </Grid>
      </Grid>

      <ModalEditUserInfo
        open={openModalEditUserInfo}
        setOpen={setOpenModalEditUserInfo}
        dataUser={user}
      />

      <ModalAlertDialog
        isLoading={isLoadingButton}
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
