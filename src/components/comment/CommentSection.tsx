import { Alert, Box, Typography } from "@mui/joy";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import _ from "lodash";
import CommentInput from "./CommentInput";
import CommentFilter from "./CommentFilter";
import CommentList from "./CommentList";

const CommentSection = () => {
  const commentList: any = useSelector(
    (state: RootState) => state.comments.commentList
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Alert color="primary">
        <Typography
          startDecorator={<ForumOutlinedIcon />}
          color="primary"
          level="title-lg"
        >
          Bình luận
        </Typography>
      </Alert>

      <CommentInput />

      {commentList.length > 0 && <CommentFilter />}

      <CommentList />
    </Box>
  );
};

export default CommentSection;
