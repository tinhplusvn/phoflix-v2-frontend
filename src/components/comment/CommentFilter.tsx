import { Alert, Option, Select, Typography } from "@mui/joy";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import { Filter } from "./CommentSection";

interface IProps {
  handleGetAllComment: (typeFilter: Filter) => Promise<void>;
}

const CommentFilter = ({ handleGetAllComment }: IProps) => {
  const [typeFilter, setTypeFilter] = useState<Filter>(() => {
    return (
      JSON.parse(localStorage.getItem("filter-comments") as Filter) ?? "DESC"
    );
  });

  const handleChangeFilter = (type: Filter) => {
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
        onChange={(event, value) => handleChangeFilter(value as Filter)}
      >
        <Option value="DESC">Mới nhất</Option>
        <Option value="ASC">Cũ nhất</Option>
      </Select>
    </Alert>
  );
};

export default CommentFilter;
