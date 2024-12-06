import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Textarea,
  Tooltip,
  Typography,
} from "@mui/joy";
import { formatDate } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { IUser } from "../../interfaces/user";
import { Link } from "react-router-dom";
import avatarImg from "../../images/avatar.jpg";
import {
  setEditComment,
  setIdComment,
  setIndexEdit,
  setOpenModalAlertDialog,
  setOpenModalReportComment,
  setValueEditComment,
} from "../../redux/slice/commentsSlice";

interface CommentItem {
  item: any;
  index: number;
  isLoading: boolean;
  handSaveEditComment: (idComment: string) => void;
}

const CommentItem = ({
  item,
  index,
  isLoading,
  handSaveEditComment,
}: CommentItem) => {
  const dispatch: AppDispatch = useDispatch();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const indexEdit = useSelector((state: RootState) => state.comments.indexEdit);
  const valueEditComment = useSelector(
    (state: RootState) => state.comments.valueEditComment
  );

  const handleOpenModalAlerDialog = (idComment: string) => {
    dispatch(setOpenModalAlertDialog(true));
    dispatch(setIdComment(idComment));
  };

  const handleOpenModalReportComment = (idComment: string) => {
    dispatch(setOpenModalReportComment(true));
    dispatch(setIdComment(idComment));
  };

  return (
    <li style={{ display: "flex", gap: "12px" }}>
      <Box>
        <Avatar alt={item?.username} src={avatarImg} />
      </Box>
      <Box
        sx={{
          border: "3px solid #f0f4f8",
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: `${indexEdit !== -1 ? "100%" : "unset"}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Tooltip title="Xem trang cá nhân" color="primary" variant="soft">
              <Typography
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                level="title-sm"
                color="primary"
              >
                <Link
                  style={{ all: "unset" }}
                  to={
                    item?.user_id === user?.id
                      ? "/thong-tin-nguoi-dung"
                      : `/xem-thong-tin/${item?.user_id}`
                  }
                >
                  {item["user.username"]}
                </Link>
              </Typography>
            </Tooltip>
            <Chip color="neutral" size="sm">
              {formatDate(item?.createdAt)}
            </Chip>
          </Box>
          {index !== indexEdit ? (
            <Typography
              sx={{
                wordBreak: "break-word",
              }}
              level="body-sm"
            >
              {item.content}
            </Typography>
          ) : (
            <Textarea
              onChange={(e) => dispatch(setValueEditComment(e.target.value))}
              sx={{ marginTop: "12px" }}
              value={valueEditComment}
              variant="outlined"
            />
          )}
        </Box>
        <Divider />
        {index !== indexEdit ? (
          <Box sx={{ display: "flex" }}>
            {item?.user_id === user?.id && (
              <>
                <Button
                  onClick={() => handleOpenModalAlerDialog(item?.id)}
                  variant="plain"
                  color="danger"
                  size="sm"
                >
                  Xoá
                </Button>
                <Button
                  onClick={() =>
                    dispatch(setEditComment({ index, content: item.content }))
                  }
                  variant="plain"
                  color="primary"
                  size="sm"
                >
                  Chỉnh sửa
                </Button>
              </>
            )}
            {item?.user_id !== user?.id && (
              <Button
                onClick={() => handleOpenModalReportComment(item?.id)}
                variant="plain"
                color="neutral"
                size="sm"
              >
                Báo cáo
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              onClick={() => dispatch(setIndexEdit(-1))}
              variant="plain"
              color="neutral"
              size="sm"
            >
              Huỷ
            </Button>
            <Button
              loading={isLoading}
              onClick={() => handSaveEditComment(item?.id)}
              variant="solid"
              color="primary"
              size="sm"
            >
              Lưu
            </Button>
          </Box>
        )}
      </Box>
    </li>
  );
};

export default CommentItem;
