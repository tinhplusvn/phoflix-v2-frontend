import { Avatar, Box, Button, Divider, Textarea, Typography } from "@mui/joy";

const CommentItem = ({
  item,
  index,
  indexEdit,
  valueEditComment,
  setValueEditComment,
  setIndexEdit,
  setIndexDelete,
  handleSetOpenModalAlertDialog,
  handleSetOpenModalReportComment,
  handleEditComment,
  handSaveEditComment,
}: any) => {
  return (
    <li style={{ display: "flex", gap: "12px" }}>
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
            <Button
              onClick={() => {
                handleSetOpenModalAlertDialog(true);
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
              color="primary"
              size="sm"
            >
              Chỉnh sửa
            </Button>
            <Button
              onClick={() => handleSetOpenModalReportComment(true)}
              variant="plain"
              color="neutral"
              size="sm"
            >
              Báo cáo
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
  );
};

export default CommentItem;
