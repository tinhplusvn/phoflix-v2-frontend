import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import _ from "lodash";
import { forgotPassword, sendOTP } from "../../redux/asyncThunk/userThunk";
import LoadingButton from "../common/LoadingButon";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setType } from "../../redux/slice/systemSlice";

interface ValueInput {
  email: string;
  password: string;
  authCode: string;
}

interface ValidInput {
  email: boolean;
  password: boolean;
  authCode: boolean;
}

const ForgotPassword = ({ setOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const defaultValue: ValueInput = {
    email: "",
    password: "",
    authCode: "",
  };
  const defaultValidIput: ValidInput = {
    email: true,
    password: true,
    authCode: true,
  };
  const [valueInput, setValueInput] = useState<ValueInput>(defaultValue);
  const [isValidInput, setIsValidInput] =
    useState<ValidInput>(defaultValidIput);
  const [isLoadingSendCode, setIsLoadingSendCode] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleCheckValidInput = (): boolean => {
    let check = true;
    const _isValidInput: ValidInput = _.clone(isValidInput);

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

  const handleSubmit = async () => {
    const check = handleCheckValidInput();
    if (check) {
      setIsLoadingSubmit(true);
      const res = await dispatch(
        forgotPassword({
          email: valueInput.email,
          code: valueInput.authCode,
          password: valueInput.password,
          type_otp: "FORGOT_PASSWORD",
        })
      );

      if (+res.payload.EC !== 0) {
        setOpen(false);
        toast.error(res.payload.EM);
      }
      setIsLoadingSubmit(false);
    }
  };

  const handleSendOTP = async () => {
    setIsLoadingSendCode(true);
    await dispatch(
      sendOTP({
        email: valueInput.email,
        type_otp: "FORGOT_PASSWORD",
      })
    );
    setIsLoadingSendCode(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <IconButton onClick={() => dispatch(setType('login'))}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          level="title-lg"
          color="primary"
        >
          Quên mật khẩu?
        </Typography>
      </Box>
      <Box>
        <Input
          value={valueInput.email}
          onChange={(e) => handleOnchangeInput(e.target.value, "email")}
          error={!isValidInput.email}
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
          value={valueInput.password}
          onChange={(e) => handleOnchangeInput(e.target.value, "password")}
          error={!isValidInput.password}
          startDecorator={<LockOutlinedIcon />}
          size="md"
          placeholder="Mật khẩu mới"
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
            value={valueInput.authCode}
            onChange={(e) => handleOnchangeInput(e.target.value, "authCode")}
            error={!isValidInput.authCode}
            sx={{ maxWidth: "180px" }}
            startDecorator={<KeyIcon />}
            size="md"
            placeholder="Mã xác thực"
            type="text" 
          />

          {isLoadingSendCode ? (
            <LoadingButton />
          ) : (
            <Button
              disabled={valueInput.email === ""}
              onClick={() => handleSendOTP()}
              variant="soft"
              color="primary"
            >
              Gửi mã
            </Button>
          )}
        </Box>
        {!isValidInput.authCode && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mã xác thực không được trống!
          </Typography>
        )}
      </Box>

      {isLoadingSubmit ? (
        <LoadingButton />
      ) : (
        <Button onClick={() => handleSubmit()}>Xác nhận</Button>
      )}
    </>
  );
};

export default ForgotPassword;
