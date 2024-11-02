import { Box, Button, Textarea } from "@mui/joy"
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/slice/commentsSlice";
import { useState } from "react";

const CommentInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const [valueComment, setValueComment] = useState<string>("");

  const handleAddComment = () => {
    dispatch(
      addComment({
        name: "Phở",
        content: valueComment,
      })
    );
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
        <Button
          onClick={() => handleAddComment()}
          disabled={valueComment === ""}
          color="primary"
          variant="solid"
        >
          Bình luận
        </Button>
      </Box>
    ); 
}

export default CommentInput