import { Alert, Box, Typography } from "@mui/joy";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommentInput from "./CommentInput";
import CommentFilter, { handleGetFilterComments } from "./CommentFilter";
import CommentList from "./CommentList";
import SkeletonComments from "../common/SkeletonComments";
import { useEffect, useRef, useState } from "react";
import { getCommentList } from "../../redux/asyncThunk/commentThunk";
import { useParams } from "react-router-dom";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import toast from "react-hot-toast";
import RefreshButton from "../common/RefreshButton";
import { socket } from "../../socket";

export type Filter = "DESC" | "ASC";

interface IComment {
  id?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string | null;
  movie_slug?: string;
  "user.name"?: string;
  user_id?: string;
}

const CommentSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const commentList = useSelector(
    (state: RootState) => state.comments.commentList
  );
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const mount = useRef(false);

  useEffect(() => {
    socket.on("refreshComments", (res) => {
      if (res?.slug === params?.slug && mount?.current) {
        handleGetAllComment("DESC");
      }
    });

    return () => {
      socket.off("refreshComments");
    };
  }, []);

  useEffect(() => {
    const filterComments = handleGetFilterComments();

    if (movieInfo?.slug) {
      handleGetAllComment(filterComments);
      mount.current = true;
    }
  }, [movieInfo?.slug]);

  const handleGetAllComment = async (typeFilter: Filter) => {
    try {
      setIsLoading(true);
      await dispatch(
        getCommentList({
          movieSlug: params.slug as string,
          sortOrder: typeFilter,
        })
      );
    } catch (error) {
      toast.error("Lỗi khi tải bình luận!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await handleGetAllComment("DESC");
    toast.success("Bình luận đã được làm mới!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Alert
        color="neutral"
        startDecorator={
          <Typography startDecorator={<ChatOutlinedIcon />} level="title-lg">
            {`Bình luận (${commentList?.length || 0})`}
          </Typography>
        }
        endDecorator={
          <RefreshButton
            title="Làm mới bình luận"
            isLoading={isLoading}
            handleRefresh={handleRefresh}
          />
        }
      ></Alert>

      <CommentInput />

      {isLoading ? (
        <SkeletonComments />
      ) : (
        <>
          {commentList?.length > 0 ? (
            <>
              <CommentFilter handleGetAllComment={handleGetAllComment} />
              <CommentList />
            </>
          ) : (
            <Typography level="title-lg" color="primary">
              Chưa có bình luận nào tại đây!
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CommentSection;
