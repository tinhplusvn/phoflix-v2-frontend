import { Box } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CommentItem from "./CommentItem";
import {
  setOpenModalAlertDialog,
  setOpenModalReportComment,
} from "../../redux/slice/commentsSlice";
import {
  deleleComment,
  getCommentList,
  updateComment,
} from "../../redux/asyncThunk/commentThunk";
import ModalAlertDialog from "../modals/ModalAlertDialog";
import ModalReportComment from "../modals/ModalReportComment";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addActivityLog } from "../../redux/asyncThunk/activityLogThunk";

const CommentList = () => {
  const commentList = useSelector(
    (state: RootState) => state.comments.commentList
  );

  const dispatch: AppDispatch = useDispatch();
  const openModalAlertDiaLog = useSelector(
    (state: RootState) => state.comments.openModal.modalAlertDialog
  );
  const openModalReportComment = useSelector(
    (state: RootState) => state.comments.openModal.modalReportComment
  );
  const user = useSelector((state: RootState) => state.users.user);
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const [indexEdit, setIndexEdit] = useState<number>(-1);
  const [valueEditComment, setValueEditComment] = useState<string>("");
  const [idComment, setIdComment] = useState<string>("");
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditComment = (index: number, content: string) => {
    setIndexEdit(index);
    setValueEditComment(content);
  };

  const handleDeleteComment = async () => {
    setIsLoading(true);
    const res = await dispatch(deleleComment(idComment as string));

    if (+res.payload.EC === 0) {
      await dispatch(
        getCommentList({ movieSlug: params.slug as string, sortOrder: "DESC" })
      );
      toast.success(res.payload.EM);
    }
    dispatch(setOpenModalAlertDialog(false));
    setIsLoading(false);
  };

  const handleSetOpenModalAlertDialog = (open: boolean) => {
    dispatch(setOpenModalAlertDialog(open));
  };

  const handleSetOpenModalReportComment = (open: boolean) => {
    dispatch(setOpenModalReportComment(open));
  };

  const handSaveEditComment = async (idComment: string) => {
    setIsLoading(true);
    const res = await dispatch(
      updateComment({
        content: valueEditComment,
        idComment,
      })
    );
    if (+res.payload.EC === 0) {
      await dispatch(
        getCommentList({ movieSlug: params.slug as string, sortOrder: "DESC" })
      );

      await dispatch(
        addActivityLog({
          userId: user?.id,
          action: `Sửa bình luận thành "${valueEditComment}" tại phim ${movieInfo.name}"`,
        })
      );
      toast.success(res.payload.EM);
    }
    setIndexEdit(-1);
    setIsLoading(false);
  };


  return (
    <>
      <Box>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: `${indexEdit !== -1 ? "100%" : "unset"}`,
          }}
        >
          {commentList.map((item: any, index: any) => (
            <CommentItem
              key={index}
              index={index}
              item={item}
              isLoading={isLoading}
              indexEdit={indexEdit}
              valueEditComment={valueEditComment}
              setIndexEdit={setIndexEdit}
              setValueEditComment={setValueEditComment}
              handleEditComment={handleEditComment}
              handleSetOpenModalAlertDialog={handleSetOpenModalAlertDialog}
              handleSetOpenModalReportComment={handleSetOpenModalReportComment}
              handSaveEditComment={handSaveEditComment}
              setIdComment={setIdComment}
            />
          ))}
        </ul>
      </Box>

      <ModalAlertDialog
        isLoading={isLoading}
        handleSubmit={handleDeleteComment}
        open={openModalAlertDiaLog}
        setOpen={handleSetOpenModalAlertDialog}
        title="Xoá bình luận"
        content="Bình luận của bạn sẽ được gỡ khỏi hệ thống"
      />

      <ModalReportComment
        open={openModalReportComment}
        setOpen={handleSetOpenModalReportComment}
      />
    </>
  );
};

export default CommentList;
