import { Box, Button, Table, Typography } from "@mui/joy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const InfomationUser = ({ setOpenModalEditUserInfo }: any) => {
  const user = useSelector((state: RootState) => state.users.user);

  return (
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
  );
};

export default InfomationUser;
