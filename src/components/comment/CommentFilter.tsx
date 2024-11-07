import { Alert, Option, Select, Typography } from "@mui/joy";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";

type filter = "DESC" | "ASC";

const CommentFilter = ({ handleGetAllComment }: any) => {
  const [typeFilter, setTypeFilter] = useState<filter>(() => {
    return JSON.parse(localStorage.getItem("filter-comments") as filter) ?? 'DESC';
  });

  const handleChangeFilter = (type: filter) => {
    handleGetAllComment(type);
    setTypeFilter(type);
    localStorage.setItem("filter-comments", JSON.stringify(type));
  };

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
        value={typeFilter}
        onChange={(event, value) => handleChangeFilter(value as filter)}
      >
        <Option value="DESC">Mới nhất</Option>
        <Option value="ASC">Cũ nhất</Option>
      </Select>
    </Alert>
  );
};

export default CommentFilter;
