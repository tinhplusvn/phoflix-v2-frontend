import { Alert, Option, Select, Typography } from "@mui/joy";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
// import { filterComment } from "../../redux/slice/commentsSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getCommentList } from "../../redux/asyncThunk/commentThunk";
import { useParams } from "react-router-dom";

type filter = "DESC" | "ASC";

const CommentFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState<filter>("DESC");
  const params = useParams();

  useEffect(() => {
    dispatch(
      getCommentList({
        movieSlug: params.slug as string,
        sortOrder: typeFilter,
      })
    );
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
        defaultValue="DESC"
        onChange={(event, value) => setTypeFilter(value as filter)}
      >
        <Option value="DESC">Mới nhất</Option>
        <Option value="ASC">Cũ nhất</Option>
      </Select>
    </Alert>
  );
};

export default CommentFilter;
