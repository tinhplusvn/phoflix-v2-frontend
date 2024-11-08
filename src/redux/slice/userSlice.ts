import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  getUser,
  verifyToken,
  updateUser,
} from "../asyncThunk/userThunk";

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  isLock: boolean;
  type_account: string;
  refresh_token: string;
  access_token: string;
  avatar?: string;
}

const initialState: any = {
  user: {},
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.code) {
        window.location.href = `/authenticate?token=${action.payload.code}&type=LOCAL`;
      }
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(verifyToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      console.log(action.payload);
      if (+action.payload?.EC === 0) {
        state.user = action.payload?.DT;
      }
      state.isLoading = false;
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload?.DT ?? {};
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload);
      if (+action.payload.EC === 0) {
        state.user = action.payload.DT;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
