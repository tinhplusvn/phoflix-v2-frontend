import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import _ from "lodash";
import { useState } from "react";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface UserInfo {
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

const ModalEditUserInfo = ({ open, setOpen }: IProps) => {
  const defaultUserInfo: UserInfo = {
    username: "",
    email: "",
    phoneNumber: "",
    gender: "Nam",
    address: "",
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const handleOnchangeInput = (value: string, type: string) => {
    const _userInfo: UserInfo = _.clone(userInfo);
    (_userInfo as any)[type] = value;
    setUserInfo(_userInfo);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: {
            xs: "90%",
            sm: "500px",
          },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography level="h4" color="primary">
          Chỉnh sửa thông tin
        </Typography>
        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Tên người dùng
            </Typography>
            <Input
              onChange={(e) => handleOnchangeInput(e.target.value, "username")}
              value={userInfo.username}
            />
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Email
            </Typography>
            <Input
              onChange={(e) => handleOnchangeInput(e.target.value, "email")}
              value={userInfo.email}
            />
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Số điện thoại
            </Typography>
            <Input
              onChange={(e) =>
                handleOnchangeInput(e.target.value, "phoneNumber")
              }
              value={userInfo.phoneNumber}
            />
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Giới tính
            </Typography>
            <Select
              onChange={(event, value) =>
                handleOnchangeInput(value as string, "gender")
              }
              defaultValue="male"
            >
              <Option value="male">Nam</Option>
              <Option value="female">Nữ</Option>
            </Select>
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Địa chỉ
            </Typography>
            <Input
              onChange={(e) => handleOnchangeInput(e.target.value, "address")}
              value={userInfo.address}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              justifyContent: "end",
              marginTop: "24px",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              color="neutral"
              variant="plain"
            >
              Huỷ bỏ
            </Button>
            <Button>Lưu</Button>
          </Box>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalEditUserInfo;
