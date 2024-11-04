import { Box, Button, Textarea } from "@mui/joy";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addComment,
  getCommentList,
} from "../../redux/asyncThunk/commentThunk";
import LoadingButton from "../common/LoadingButon";
import toast from "react-hot-toast";

const CommentInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const [valueComment, setValueComment] = useState<string>("");
  const params = useParams();
  const user = useSelector((state: RootState) => state.users.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddComment = async () => {
    if (!user.access_token || !user.refresh_token) {
      toast.error("Vui lòng đăng nhập để bình luận!");
      return;
    }

    setIsLoading(true);
    const res = await dispatch(
      addComment({
        user_id: user.id,
        movie_slug: params.slug,
        content: valueComment,
      })
    );

    if (+res.payload.EC === 0) {
      toast.success(res.payload.EM);
      dispatch(getCommentList(params.slug as string));
    }
    setIsLoading(false);
    setValueComment("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        gap: "12px",
      }}
    >
      <Textarea
        value={valueComment}
        onChange={(e) => setValueComment(e.target.value)}
        sx={{ width: "100%" }}
        minRows={3}
        placeholder="Nhập bình luận của bạn..."
      />
      {isLoading ? (
        <LoadingButton />
      ) : (
        <Button
          onClick={() => handleAddComment()}
          disabled={valueComment === ""}
          color="primary"
          variant="solid"
        >
          Bình luận
        </Button>
      )}
    </Box>
  );
};

export default CommentInput;