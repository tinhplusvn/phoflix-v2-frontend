import { Alert, Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommentInput from "./CommentInput";
import CommentFilter from "./CommentFilter";
import CommentList from "./CommentList";
import SkeletonComments from "../common/SkeletonComments";
import { useEffect, useState } from "react";
import { getCommentList } from "../../redux/asyncThunk/commentThunk";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";

type filter = "DESC" | "ASC";

const CommentSection = () => {
  const dispatch: AppDispatch = useDispatch();

  const commentList: any = useSelector(
    (state: RootState) => state.comments.commentList
  );
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetAllComment("DESC");
  }, []);

  const handleGetAllComment = async (typeFilter: filter) => {
    setIsLoading(true);
    await dispatch(
      getCommentList({
        movieSlug: params.slug as string,
        sortOrder: typeFilter,
      })
    );
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Alert color="primary" sx={{ justifyContent: "space-between" }}>
        <Typography
          startDecorator={<ForumOutlinedIcon />}
          color="primary"
          level="title-lg"
        >
          Bình luận
        </Typography>
        <Tooltip title="Làm mới bình luận">
          <IconButton onClick={() => handleGetAllComment("DESC")}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Alert>

      <CommentInput />

      {isLoading ? (
        <SkeletonComments />
      ) : (
        <>
          {commentList.length > 0 && (
            <CommentFilter handleGetAllComment={handleGetAllComment} />
          )}
          <CommentList />
        </>
      )}
    </Box>
  );
};

export default CommentSection;
