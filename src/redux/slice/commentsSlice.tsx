import { createSlice } from "@reduxjs/toolkit";

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
}

const initialState: IComments = {
  commentList: JSON.parse(localStorage.getItem("comments") as string) ?? [],
  openModal: {
    modalAlertDialog: false,
    modalReportComment: false,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.commentList.unshift(action.payload);
      localStorage.setItem("comments", JSON.stringify(state.commentList));
    },
    removeComment: (state, action) => {
      state.commentList.splice(action.payload, 1);
      localStorage.setItem("comments", JSON.stringify(state.commentList));
    },
    editComment: (state, action) => {
      state.commentList[action.payload.index].content = action.payload.content;
      localStorage.setItem("comments", JSON.stringify(state.commentList));
    },
    filterComment: (state, action) => {
      state.commentList.reverse();
    },
    setOpenModalAlertDialog: (state, action) => {
      state.openModal.modalAlertDialog = action.payload;
    },
    setOpenModalReportComment: (state, action) => {
      state.openModal.modalReportComment = action.payload;
    },
  },
  //   extraReducers:
});

// Action creators are generated for each case reducer function
export const {
  addComment,
  removeComment,
  editComment,
  filterComment,
  setOpenModalAlertDialog,
  setOpenModalReportComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
