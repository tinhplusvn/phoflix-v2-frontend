import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/asyncThunk/userThunk";
import toast from "react-hot-toast";
import {
  addActivityLog,
  getActivityLog,
} from "../../redux/asyncThunk/activityLogThunk";
import { IUser } from "../../interfaces/user";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataUser: any;
}

interface UserInfo {
  username: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
}

const ModalEditUserInfo = ({ open, setOpen, dataUser }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const user: IUser = useSelector((state: RootState) => state.users.user);

  const defaultUserInfo: UserInfo = {
    username: "",
    email: "",
    phone_number: "",
    gender: "Nam",
    address: "",
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnchangeInput = (value: string, type: string) => {
    const _userInfo: UserInfo = _.clone(userInfo);
    (_userInfo as any)[type] = value;
    setUserInfo(_userInfo);
  };

  useEffect(() => {
    setUserInfo({
      username: dataUser.username,
      email: dataUser.email,
      phone_number: dataUser.phone_number,
      gender: dataUser.gender,
      address: dataUser.address,
    });
  }, [dataUser]);

  const handleUpdateUser = async () => {
    const { username, email, gender, address, phone_number } = userInfo;
    if (!username || !gender || !address || !phone_number) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    const res = await dispatch(
      updateUser({
        email: userInfo.email,
        username: userInfo.username,
        gender: userInfo.gender,
        address: userInfo.address,
        phone_number: userInfo.phone_number,
        type_account: dataUser.type_account,
      })
    );

    if (+res.payload?.EC === 0) {
      setOpen(false);
      toast.success(res.payload.EM);
      await dispatch(
        addActivityLog({
          userId: user?.id as string,
          action: "Cập nhật thông tin người dùng!",
        })
      );
      await dispatch(getActivityLog(user?.id as string));
    } else {
      toast.error(res.payload.EM);
    }

    setIsLoading(false);
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
              value={userInfo.username || ""}
            />
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Email
            </Typography>
            <Input disabled value={userInfo.email || ""} />
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Số điện thoại
            </Typography>
            <Input
              onChange={(e) =>
                handleOnchangeInput(e.target.value, "phone_number")
              }
              value={userInfo.phone_number || ""}
            />
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Giới tính
            </Typography>
            <RadioGroup
              value={userInfo.gender}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOnchangeInput(event.target.value, "gender")
              }
            >
              <Radio value="Nam" label="Nam" />
              <Radio value="Nữ" label="Nữ" />
            </RadioGroup>
          </Box>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="title-md">
              Địa chỉ
            </Typography>
            <Input
              onChange={(e) => handleOnchangeInput(e.target.value, "address")}
              value={userInfo.address || ""}
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

            <Button
              loading={isLoading}
              onKeyDown={(e) => e.code === "Enter" && handleUpdateUser()}
              onClick={() => handleUpdateUser()}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalEditUserInfo;
