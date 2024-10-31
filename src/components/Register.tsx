import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Box, Button, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { setType } from "../redux/slice/systemSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import _ from "lodash";

interface ValueInput {
  username: string;
  email: string;
  password: string;
  authCode: string;
}

interface ValidInput {
  username: boolean;
  email: boolean;
  password: boolean;
  authCode: boolean;
}

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const defaultValueRegister: ValueInput = {
    email: "",
    password: "",
    username: "",
    authCode: "",
  };
  const defaultValidIput: ValidInput = {
    email: true,
    password: true,
    username: true,
    authCode: true,
  };
  const [valueInput, setValueInput] =
    useState<ValueInput>(defaultValueRegister);
  const [isValidInput, setIsValidInput] =
    useState<ValidInput>(defaultValidIput);

  const handleCheckValidInput = (): boolean => {
    let check = true;
    const _isValidInput: ValidInput = _.clone(isValidInput);

    if (valueInput.username === "") {
      _isValidInput.username = false;
      check = false;
    }

    if (valueInput.email === "") {
      _isValidInput.email = false;
      check = false;
    }

    if (valueInput.password === "") {
      _isValidInput.password = false;
      check = false;
    }

    if (valueInput.authCode === "") {
      _isValidInput.authCode = false;
      check = false;
    }

    setIsValidInput(_isValidInput);
    return check;
  };

  const handleOnchangeInput = (value: string, type: string) => {
    const _valueInput: ValueInput = _.clone(valueInput);
    const _isValidInput: ValidInput = _.clone(isValidInput);
    (_valueInput as any)[type] = value;
    (_isValidInput as any)[type] = true;
    setValueInput(_valueInput);
    setIsValidInput(_isValidInput);
  };

  const handleRegister = () => {
    handleCheckValidInput();
  };

  return (
    <>
      <Typography
        sx={{ marginBottom: "12px" }}
        level="title-lg"
        color="primary"
      >
        Đăng ký
      </Typography>
      <Box>
        <Input
          error={!isValidInput.username}
          onChange={(e) => handleOnchangeInput(e.target.value, "username")}
          value={valueInput.username}
          startDecorator={<PersonOutlineIcon />}
          size="md"
          placeholder="Tên người dùng"
          type="text"
        />
        {!isValidInput.username && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Tên người dùng không được trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          error={!isValidInput.email}
          onChange={(e) => handleOnchangeInput(e.target.value, "email")}
          value={valueInput.email}
          startDecorator={<AlternateEmailIcon />}
          size="md"
          placeholder="Email"
          type="email"
        />
        {!isValidInput.email && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Email không được trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          error={!isValidInput.password}
          onChange={(e) => handleOnchangeInput(e.target.value, "password")}
          value={valueInput.password}
          startDecorator={<LockOutlinedIcon />}
          size="md"
          placeholder="Mật khẩu"
          type="password"
        />
        {!isValidInput.password && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mật khẩu không được trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Input
            error={!isValidInput.authCode}
            onChange={(e) => handleOnchangeInput(e.target.value, "authCode")}
            value={valueInput.authCode}
            sx={{ maxWidth: "180px" }}
            startDecorator={<KeyIcon />}
            size="md"
            placeholder="Mã xác thực"
            type="number"
          />
          <Button variant="solid" color="neutral">
            Gửi mã
          </Button>
        </Box>
        {!isValidInput.authCode && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mã xác thực không được trống!
          </Typography>
        )}
      </Box>
      <Button onClick={() => handleRegister()}>Đăng ký</Button>

      <Box
        sx={{
          display: "flex",
          gap: "4px",
          marginTop: "12px",
          justifyContent: "center",
        }}
      >
        <Typography level="title-sm" color="neutral">
          Đã có tài khoản?
        </Typography>
        <Typography
          onClick={() => dispatch(setType("login"))}
          level="title-sm"
          color="primary"
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Đăng nhập
        </Typography>
      </Box>
    </>
  );
};

export default Register;
