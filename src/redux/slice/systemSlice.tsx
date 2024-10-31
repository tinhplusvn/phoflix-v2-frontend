import { createSlice } from "@reduxjs/toolkit";

export interface ISystemState {
  type: string;
  isOpen: boolean;
  theme: 'light'|'dark';
}

const initialState: ISystemState = {
  type: "login",
  isOpen: false,
  theme: "light",
};

export const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setType } = systemSlice.actions;

export default systemSlice.reducer;
