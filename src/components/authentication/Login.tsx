import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Box, Button, Divider, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { setType } from "../../redux/slice/systemSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRef, useState } from "react";
import _ from "lodash";

interface ValueInput {
  email: string;
  password: string;
}

interface ValidInput {
  email: boolean;
  password: boolean;
}

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const defaultValueLogin: ValueInput = {
    email: "",
    password: "",
  };
  const defaultValidIput: ValidInput = {
    email: true,
    password: true,
  };
  const [valueInput, setValueInput] = useState<ValueInput>(defaultValueLogin);
  const [isValidInput, setIsValidInput] =
    useState<ValidInput>(defaultValidIput);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleCheckValidInput = (): boolean => {
    let check = true;
    const _isValidInput: ValidInput = _.clone(isValidInput);
    if (valueInput.email === "") {
        if (emailRef.current) {
            emailRef.current.focus()
        }
      _isValidInput.email = false;
      check = false;
    }

    if (valueInput.password === "") {
      _isValidInput.password = false;
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

  const handleLogin = () => {
    const check = handleCheckValidInput();
  };

  return (
    <>
      <Typography
        sx={{ marginBottom: "12px" }}
        level="title-lg"
        color="primary"
      >
        Đăng nhập
      </Typography>
      <Box>
        <Input
          ref={emailRef}
          error={!isValidInput.email}
          onChange={(e) => handleOnchangeInput(e.target.value, "email")}
          value={valueInput.email}
          startDecorator={<AlternateEmailIcon />}
          size="md"
          placeholder="Email"
          type="text"
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
            Mật khẩu được bỏ trống!
          </Typography>
        )}
      </Box>
      <Button onClick={() => handleLogin()}>Đăng nhập</Button>
      <Typography
        onClick={() => dispatch(setType("forgot-password"))}
        sx={{
          marginLeft: "auto",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        level="title-sm"
        color="neutral"
      >
        Quên mật khẩu?
      </Typography>
      <Divider sx={{ margin: "12px 0" }} />
      <Button variant="soft" color="neutral" startDecorator={<GoogleIcon />}>
        Đăng nhập với Google
      </Button>
      <Button variant="soft" color="primary" startDecorator={<FacebookIcon />}>
        Đăng nhập với Facebook
      </Button>
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          marginTop: "12px",
          justifyContent: "center",
        }}
      >
        <Typography level="title-sm" color="neutral">
          Chưa có tài khoản?
        </Typography>
        <Typography
          onClick={() => dispatch(setType("register"))}
          level="title-sm"
          color="primary"
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Đăng ký
        </Typography>
      </Box>
    </>
  );
};

export default Login;
