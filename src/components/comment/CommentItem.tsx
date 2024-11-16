import {
  Avatar,
  Box,
  Button,
  Divider,
  Textarea,
  Tooltip,
  Typography,
} from "@mui/joy";
import { formatDate } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IUser } from "../../interfaces/user";
import { Link } from "react-router-dom";
import avatarImg from "../../images/avatar.jpg";

interface CommentItem {
  item: any;
  index: number;
  indexEdit: number;
  isLoading: boolean;
  valueEditComment: string;
  setValueEditComment: (content: string) => void;
  setIndexEdit: (index: number) => void;
  setIdComment: (id: string) => void;
  handleSetOpenModalAlertDialog: (open: boolean) => void;
  handleSetOpenModalReportComment: (open: boolean) => void;
  handleEditComment: (index: number, content: string) => void;
  handSaveEditComment: (idComment: string) => void;
}

const CommentItem = ({
  item,
  index,
  indexEdit,
  isLoading,
  valueEditComment,
  setValueEditComment,
  setIndexEdit,
  setIdComment,
  handleSetOpenModalAlertDialog,
  handleSetOpenModalReportComment,
  handleEditComment,
  handSaveEditComment,
}: CommentItem) => {
  const user: IUser = useSelector((state: RootState) => state.users.user);

  const handleOpenModalAlerDialog = (idComment: string) => {
    handleSetOpenModalAlertDialog(true);
    setIdComment(idComment);
  };

  const handleOpenModalReportComment = (idComment: string) => {
    handleSetOpenModalReportComment(true);
    setIdComment(idComment);
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
        <Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Typography
              sx={{
                cursor: "pointer",
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
            <Typography level="body-xs" color="neutral">
              {formatDate(item?.createdAt)}
            </Typography>
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
                  onClick={() => handleEditComment(index, item.content)}
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
              onClick={() => setIndexEdit(-1)}
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
