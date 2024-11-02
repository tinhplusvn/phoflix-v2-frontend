import { Alert, Option, Select, Typography } from "@mui/joy";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
import { filterComment } from "../../redux/slice/commentsSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

type filter = "latest" | "oldest";

const CommentFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState<filter>("latest");

  useEffect(() => {
    dispatch(filterComment(typeFilter));
  }, [typeFilter]);

  return (
    <Alert
      sx={{
        gap: "12px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography startDecorator={<FilterAltOutlinedIcon />} level="title-md">
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
  );
};

export default CommentFilter;
