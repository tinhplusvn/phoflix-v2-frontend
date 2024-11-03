import { createSlice } from "@reduxjs/toolkit";
import { login, logout, getUser } from "../asyncThunk/userThunk";

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
}

const initialState: any = {
  user: JSON.parse(localStorage.getItem("user") as string) ?? {},
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
      if (+action.payload.status.EC === 0) {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      localStorage.removeItem("user");
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
      console.log(action.payload);
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
