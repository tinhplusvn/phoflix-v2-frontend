import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Option,
  Select,
  Textarea,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  editComment,
  filterComment,
  IComments,
  removeComment,
} from "../redux/slice/commentsSlice";
import _ from "lodash";
import ModalAlertDialog from "./modals/ModalAlertDialog";

type filter = "latest" | "oldest";

const Comments = () => {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments);
  const [valueComment, setValueComment] = useState<string>("");
  const [valueEditComment, setValueEditComment] = useState<string>("");
  const [indexEdit, setIndexEdit] = useState<number>(-1);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(false);
  const [typeFilter, setTypeFilter] = useState<filter>("latest");

  useEffect(() => {
    dispatch(filterComment(typeFilter));
  }, [typeFilter]);

  const handleAddComment = () => {
    dispatch(
      addComment({
        name: "Phở",
        content: valueComment,
      })
    );
    setValueComment("");
  };

  const handleEditComment = (index: number, content: string) => {
    setIndexEdit(index);
    setValueEditComment(content);
  };

  const handSaveEditComment = (index: number) => {
    dispatch(
      editComment({
        content: valueEditComment,
        index,
      })
    );
    setIndexEdit(-1);
  };

  const handleDeleteComment = () => {
    dispatch(removeComment(indexDelete));
    setOpen(false);
  };

  return (
    <>
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
        <Box sx={{ display: " flex", flexDirection: "column", gap: "32px" }}>
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {comments.length > 0 && (
              <Alert sx={{ gap: "12px", alignItems: "center" }}>
                <Typography
                  startDecorator={<FilterAltOutlinedIcon />}
                  level="title-md"
                >
                  Lọc bình luận
                </Typography>
                <Select
                  defaultValue="latest"
                  onChange={(event, value) => setTypeFilter(value as filter)}
                >
                  <Option value="latest">Mới nhất</Option>
                  <Option value="oldest">Cũ nhất</Option>
                </Select>
              </Alert>
            )}

            <CommentList
              indexEdit={indexEdit}
              valueEditComment={valueEditComment}
              setValueEditComment={setValueEditComment}
              handleEditComment={handleEditComment}
              handSaveEditComment={handSaveEditComment}
              comments={comments}
              setIndexEdit={setIndexEdit}
              setOpen={setOpen}
              setIndexDelete={setIndexDelete}
            />
          </Box>
        </Box>
      </Box>

      <ModalAlertDialog
        handleSubmid={handleDeleteComment}
        open={open}
        setOpen={setOpen}
        title="Xoá bình luận"
        content="Bình luận của bạn sẽ được gỡ khỏi hệ thống"
      />
    </>
  );
};

export default Comments;

interface ICommentList {
  comments: IComments[];
  setOpen: (open: boolean) => void;
  indexEdit: number;
  valueEditComment: string;
  setIndexDelete: (index: number) => void;
  setValueEditComment: (value: string) => void;
  setIndexEdit: (index: number) => void;
  handleEditComment: (index: number, content: string) => void;
  handSaveEditComment: (index: number) => void;
}

const CommentList = ({
  comments,
  setOpen,
  indexEdit,
  valueEditComment,
  setIndexDelete,
  setValueEditComment,
  setIndexEdit,
  handleEditComment,
  handSaveEditComment,
}: ICommentList) => {
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: `${indexEdit !== -1 ? "100%" : "unset"}`,
      }}
    >
      {comments.map((item, index) => (
        <li key={index} style={{ display: "flex", gap: "12px" }}>
          <Box>
            <Avatar />
          </Box>
          <Box
            sx={{
              border: "1px solid #aaa",
              padding: "8px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: `${indexEdit !== -1 ? "100%" : "unset"}`,
            }}
          >
            <Box>
              <Typography level="title-md" color="primary">
                {item.name}
              </Typography>
              {index !== indexEdit ? (
                <Typography level="body-sm">{item.content}</Typography>
              ) : (
                <Textarea
                  onChange={(e) => setValueEditComment(e.target.value)}
                  sx={{ marginTop: "12px" }}
                  value={valueEditComment}
                  variant="outlined"
                />
              )}
            </Box>
            <Divider />
            {index !== indexEdit ? (
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setIndexDelete(index);
                  }}
                  variant="plain"
                  color="danger"
                  size="sm"
                >
                  Xoá
                </Button>
                <Button
                  onClick={() => handleEditComment(index, item.content)}
                  variant="plain"
                  color="neutral"
                  size="sm"
                >
                  Chỉnh sửa
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={() => setIndexEdit(-1)}
                  variant="plain"
                  color="neutral"
                  size="sm"
                >
                  Huỷ
                </Button>
                <Button
                  onClick={() => handSaveEditComment(index)}
                  variant="plain"
                  color="primary"
                  size="sm"
                >
                  Xác nhận
                </Button>
              </Box>
            )}
          </Box>
        </li>
      ))}
    </ul>
  );
};
