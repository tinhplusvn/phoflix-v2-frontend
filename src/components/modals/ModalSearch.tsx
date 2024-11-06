import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/joy/Divider";
import HistoryIcon from "@mui/icons-material/History";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import "../../styles/ModalSearch.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addSearchHistory,
  deletSearchHistory,
  getSearchHistory,
} from "../../redux/asyncThunk/searchHistoryThunk";
import { addActivityLog } from "../../redux/asyncThunk/activityLogThunk";

type ModalSearch = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type searchValue = string | "";
type actions = "recent" | "favorite";

const ModalSearch = ({ open, setOpen }: ModalSearch) => {
  const [searchValue, setSearchValue] = useState<searchValue>("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.users.user);
  const searchRecent = useSelector(
    (state: RootState) => state.searchHistory.searchRecent
  );
  const searchFavourite = useSelector(
    (state: RootState) => state.searchHistory.searchFavourite
  );

  useEffect(() => {
    dispatch(getSearchHistory(user.id as string));
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleSearchInput = async (actions: actions) => {
    if (searchValue !== "") {
      navigate(`/tim-kiem/${searchValue}`);
      await dispatch(
        addSearchHistory({
          userId: user.id,
          type: "recent",
          keyword: searchValue,
        })
      );
      await dispatch(getSearchHistory(user.id as string));
      await dispatch(
        addActivityLog({
          userId: user?.id,
          action: `Tìm kiếm từ khoá "${searchValue}"`,
        })
      );
      setSearchValue("");
      setOpen(false);
    }
  };

  const handleSearchFromSearchList = async (value: string) => {
    navigate(`/tim-kiem/${value}`);
    await dispatch(
      addActivityLog({
        userId: user?.id,
        action: `Tìm kiếm từ khoá "${value}"`,
      })
    );
    setSearchValue("");
    setOpen(false);
  };

  const handleFavouriteSearchHistory = async (
    keyword: string,
    idSearchHistory: string
  ) => {
    await dispatch(
      addSearchHistory({
        userId: user.id,
        type: "favourite",
        keyword,
        idSearchHistory,
      })
    );
    await dispatch(getSearchHistory(user.id as string));
  };

  const handleRemoveSearch = async (item: any) => {
    await dispatch(deletSearchHistory(item));
    await dispatch(getSearchHistory(user.id as string));
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog
        sx={{
          minWidth: {
            xs: "90%",
            sm: "640px",
          },
        }}
        layout="center"
      >
        <Box>
          <Input
            size="lg"
            ref={searchRef}
            onKeyDown={(e) => e.code === "Enter" && handleSearchInput("recent")}
            value={searchValue || ""}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ flex: "1" }}
            color="primary"
            variant="outlined"
            placeholder="Tìm kiếm phim..."
            startDecorator={<SearchIcon color="primary" />}
            endDecorator={
              <Button
                disabled={searchValue === ""}
                onClick={() => handleSearchInput("recent")}
                variant="solid"
              >
                Tìm kiếm
              </Button>
            }
          />
        </Box>

        <Divider sx={{ margin: "12px -24px" }} />

        <Box
          sx={{
            height: "360px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {searchRecent.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Typography level="title-md" color="neutral">
                Gần đây
              </Typography>
              <ul className="search-list">
                {searchRecent.map((item: any, index: number) => (
                  <li key={index} className="search-item">
                    <Box
                      onClick={() => handleSearchFromSearchList(item?.keyword)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1",
                        height: "100%",
                      }}
                    >
                      <HistoryIcon />
                      {item?.keyword}
                    </Box>
                    <Box>
                      <IconButton
                        title="Đánh dấu yêu thích"
                        onClick={() =>
                          handleFavouriteSearchHistory(item.keyword, item.id)
                        }
                        color="primary"
                      >
                        <StarBorderIcon />
                      </IconButton>
                      <IconButton
                        title="Xoá"
                        onClick={() => handleRemoveSearch(item)}
                        color="primary"
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>
                  </li>
                ))}
              </ul>
            </Box>
          )}
          {searchFavourite.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Typography level="title-md" color="neutral">
                Yêu thích
              </Typography>
              <ul className="search-list">
                {searchFavourite.map((item: any, index: number) => (
                  <li key={index} className="search-item">
                    <Box
                      onClick={() => handleSearchFromSearchList(item?.keyword)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1",
                        height: "100%",
                      }}
                    >
                      <StarBorderIcon />
                      {item?.keyword}
                    </Box>
                    <Box>
                      <IconButton
                        title="Xoá"
                        onClick={() => handleRemoveSearch(item.id)}
                        color="primary"
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ModalSearch;
