import { Box, Button } from "@mui/joy";
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
import { handleGetFilterComments } from "./CommentFilter";
import { isEmpty } from "lodash";
import { scrollToTop } from "../../utils";
import ToggleShowItem from "../common/ToggleShowItem";
import { socket } from "../../socket";

const CommentList = () => {
  const commentListStore = useSelector(
    (state: RootState) => state.comments.commentList
  );
  const openModalAlertDiaLog = useSelector(
    (state: RootState) => state.comments.openModal.modalAlertDialog
  );
  const openModalReportComment = useSelector(
    (state: RootState) => state.comments.openModal.modalReportComment
  );

  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const [commentList, setCommentList] = useState<any>([]);
  const [indexEdit, setIndexEdit] = useState<number>(-1);
  const [valueEditComment, setValueEditComment] = useState<string>("");
  const [idComment, setIdComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [typeShow, setTypeShow] = useState<string>("collapse");

  useEffect(() => {
    setCommentList(commentListStore.slice(0, 5));
    setTypeShow("collapse");
  }, [commentListStore]);

  const handleShowComment = (commentList: any, type: string) => {
    setCommentList(commentList);
    setTypeShow(type);
    type === "collapse" && scrollToTop();
  };

  const handleEditComment = (index: number, content: string) => {
    setIndexEdit(index);
    setValueEditComment(content);
  };

  const handleDeleteComment = async () => {
    setIsLoading(true);
    const res = await dispatch(deleleComment(idComment as string));

    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
    }
    dispatch(setOpenModalAlertDialog(false));
    setIsLoading(false);

    socket.emit("deleteComment", { slug: params?.slug });
  };

  const handleSetOpenModalAlertDialog = (open: boolean) => {
    dispatch(setOpenModalAlertDialog(open));
  };

  const handleSetOpenModalReportComment = (open: boolean) => {
    dispatch(setOpenModalReportComment(open));
  };

  const handSaveEditComment = async (idComment: string) => {
    if (isEmpty(valueEditComment.trim())) {
      toast.error("Vui lòng nhập nội dung!");
      return;
    }

    setIsLoading(true);
    const res = await dispatch(
      updateComment({
        content: valueEditComment,
        idComment,
      })
    );
    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);

      socket.emit("updateComment", { slug: params?.slug });
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
        {commentListStore.length > 5 && (
          <Box sx={{ margin: "24px auto 0 auto" }}>
            <ToggleShowItem
              type={typeShow}
              data={commentListStore}
              quantity={5}
              text="bình luận"
              location="center"
              handleShowItem={handleShowComment}
            />
          </Box>
        )}
      </Box>

      <ModalAlertDialog
        isLoading={isLoading}
        handleSubmit={handleDeleteComment}
        open={openModalAlertDiaLog}
        setOpen={handleSetOpenModalAlertDialog}
        title="Xoá bình luận"
        content="Bạn có chắc chắn muốn xoá bình luận này?"
      />

      <ModalReportComment
        idComment={idComment}
        setIdComment={setIdComment}
        open={openModalReportComment}
        setOpen={handleSetOpenModalReportComment}
      />
    </>
  );
};

export default CommentList;
