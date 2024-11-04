import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";

export const register = createAsyncThunk(
  "users/register",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("users/login", async (rawData: any) => {
  try {
    const response: any = await axios.post(
      `${process.env.REACT_APP_API}/auth/login`,
      rawData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/forgot-password`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/update-user`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "users/verifyToken",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify-token`,
        rawData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response: any = await axios.get(
      `${process.env.REACT_APP_API}/auth/logout`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getUser = createAsyncThunk("users/getUser", async () => {
  try {
    const response: any = await axios.get(
      `${process.env.REACT_APP_API}/auth/user`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const sendOTP = createAsyncThunk(
  "users/sendOtp",
  async (rawData: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/send-otp`,
        rawData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
