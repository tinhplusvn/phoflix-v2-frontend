import { createSlice } from "@reduxjs/toolkit";
import { getCommentList } from "../asyncThunk/commentThunk";

export type CommentList = {
  name: string;
  content: string;
};

type OpenModal = {
  modalAlertDialog: boolean;
  modalReportComment: boolean;
};

export interface IComments {
  commentList: CommentList[];
  openModal: OpenModal;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IComments = {
  commentList: [],
  openModal: {
    modalAlertDialog: false,
    modalReportComment: false,
  },
  isLoading: true,
  isError: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setOpenModalAlertDialog: (state, action) => {
      state.openModal.modalAlertDialog = action.payload;
    },
    setOpenModalReportComment: (state, action) => {
      state.openModal.modalReportComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentList.pending, (state, action) => {})
      .addCase(getCommentList.fulfilled, (state, action) => {
        state.commentList = action.payload?.DT ?? [];
        state.isLoading = !action.payload?.DT;
      })
      .addCase(getCommentList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setOpenModalAlertDialog, setOpenModalReportComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
