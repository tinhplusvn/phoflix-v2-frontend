import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import HistoryIcon from "@mui/icons-material/History";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearIcon from "@mui/icons-material/Clear";


interface SearchListProps {
  data: any;
  handleSearch: (value: string) => void;
  handleRemoveSearch: (item: any) => void;
  handleFavouriteSearchHistory?: (
    keyword: string,
    idSearchHistory: string
  ) => void;
  type: "recent" | "favorite";
}

const SearchList = ({
  data,
  type,
  handleSearch,
  handleRemoveSearch,
  handleFavouriteSearchHistory,
}: SearchListProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography level="title-md" color="neutral">
        {type === "recent" ? "Gần đây" : "Yêu thích"}
      </Typography>
      <ul className="search-list">
        {data.map((item: any, index: number) => (
          <li key={index} className="search-item">
            <Box
              onClick={() => handleSearch(item?.keyword)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flex: "1",
                height: "100%",
              }}
            >
              {type === "recent" ? <HistoryIcon /> : <StarBorderIcon />}
              {item?.keyword}
            </Box>
            <Box>
              {type === "recent" && (
                <Tooltip title="Đánh dấu yêu thích">
                  <IconButton
                    title="Đánh dấu yêu thích"
                    onClick={() => {
                      if (handleFavouriteSearchHistory) {
                        handleFavouriteSearchHistory(item.keyword, item.id);
                      }
                    }}
                    color="primary"
                  >
                    <StarBorderIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Xoá khỏi lịch sử">
                <IconButton
                  title="Xoá"
                  onClick={() => handleRemoveSearch(item.id)}
                  color="primary"
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SearchList;
