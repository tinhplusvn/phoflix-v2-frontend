export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
  code: string;
  type_account: "LOCAL" | "GOOGLE";
  type_otp: "REGISTER" | "FORGOT_PASSWORD";
}

export interface iForgotPassword {
  code: string;
  type_otp: "FORGOT_PASSWORD";
  email: string;
  password: string;
}

export interface IUpdateUser {
  email: string;
  username: string;
  gender: string;
  address: string;
  phone_number: string;
  type_account: "LOCAL" | "GOOGLE";
}

export interface IVerifyToken {
  token: string;
  typeAccount: "LOCAL" | "GOOGLE";
}

export interface ISendOTP {
  email: string;
  type_otp: "REGISTER" | "FORGOT_PASSWORD";
}
