import { createSlice } from "@reduxjs/toolkit";

export interface ISystemState {
  type: string;
  isOpenModalAuthentication: boolean;
  theme: "light" | "dark";
  isMobile: boolean;
  width: number;
}

const initialState: ISystemState = {
  type: "login",
  isOpenModalAuthentication: false,
  theme: "light",
  isMobile: false,
  width: window.innerWidth,
};

export const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpenModalAuthentication = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setType, setIsMobile, setWidth } = systemSlice.actions;

export default systemSlice.reducer;
