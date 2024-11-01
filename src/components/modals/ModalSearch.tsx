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

type ModalSearch = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type searchValue = string | "";
type actions = "recent" | "favorite";

const ModalSearch = ({ open, setOpen }: ModalSearch) => {
  const [searchValue, setSearchValue] = useState<searchValue>("");
  const [searchRecent, setSearchRecent] = useState<string[]>([]);
  const [searchFavorite, setSearchFavorite] = useState<string[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const _searchRecent: string[] =
      JSON.parse(localStorage.getItem("search-recent") as string) || [];
    const _searchFavorite: string[] =
      JSON.parse(localStorage.getItem("search-favorite") as string) || [];

    setSearchRecent(_searchRecent);
    setSearchFavorite(_searchFavorite);
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleSearchInput = (actions: actions) => {
    if (searchValue !== "") {
      navigate(`/tim-kiem/${searchValue}`);
      handleAddSearchType(actions);
      setSearchValue("");
      setOpen(false);
    }
  };

  const handleSearchFromSearchList = (value: string) => {
    navigate(`/tim-kiem/${value}`);
    setSearchValue("");
    setOpen(false);
  };

  const handleAddSearchType = (
    actions: actions,
    item?: string,
    index?: number
  ) => {
    let _searchRecent = _.cloneDeep(searchRecent);
    let _searchFavorite = _.cloneDeep(searchFavorite);

    const isExist =
      actions === "recent"
        ? _searchRecent.some((value) => value === searchValue)
        : _searchFavorite.some((value) => value === item);

    if (!isExist) {
      if (actions === "recent") {
        _searchRecent = [searchValue as string, ...searchRecent];
        setSearchRecent(_searchRecent);
        localStorage.setItem("search-recent", JSON.stringify(_searchRecent));
      } else {
        _searchRecent.splice(index as number, 1);
        setSearchRecent(_searchRecent);
        _searchFavorite = [item as string, ...searchFavorite];
        setSearchFavorite(_searchFavorite);
        localStorage.setItem(
          "search-favorite",
          JSON.stringify(_searchFavorite)
        );
      }
    }
  };

  const handleRemoveSearch = (index: number, actions: actions) => {
    let _searchList: string[] =
      actions === "recent"
        ? _.cloneDeep(searchRecent)
        : _.cloneDeep(searchFavorite);

    _searchList.splice(index, 1);
    if (actions === "recent") {
      setSearchRecent(_searchList);
      localStorage.setItem("search-recent", JSON.stringify(_searchList));
    } else {
      setSearchFavorite(_searchList);
      localStorage.setItem("search-favorite", JSON.stringify(_searchList));
    }
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
            sm: "50%",
          },
        }}
        layout="center"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Input
            ref={searchRef}
            onKeyDown={(e) => e.code === "Enter" && handleSearchInput("recent")}
            value={searchValue || ""}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ flex: "1" }}
            variant="plain"
            placeholder="Tìm kiếm phim..."
            startDecorator={<SearchIcon color="primary" />}
          />

          <Button
            disabled={searchValue === ""}
            onClick={() => handleSearchInput("recent")}
            variant="soft"
          >
            Tìm kiếm
          </Button>
        </Box>

        <Divider sx={{ margin: "12px -24px" }} />

        <Box sx={{ height: "360px", overflowY: "auto" }}>
          {searchRecent.length > 0 && (
            <Box>
              <Typography
                sx={{ marginBottom: "12px" }}
                level="title-md"
                color="neutral"
              >
                Gần đây
              </Typography>
              <ul className="search-list">
                {searchRecent.map((item, index) => (
                  <li key={index} className="search-item">
                    <Box
                      onClick={() => handleSearchFromSearchList(item)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1",
                      }}
                    >
                      <HistoryIcon />
                      {item}
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() =>
                          handleAddSearchType("favorite", item, index)
                        }
                        color="primary"
                      >
                        <StarBorderIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemoveSearch(index, "recent")}
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
          {searchFavorite.length > 0 && (
            <Box>
              <Typography
                sx={{ margin: "12px 0" }}
                level="title-md"
                color="neutral"
              >
                Yêu thích
              </Typography>
              <ul className="search-list">
                {searchFavorite.map((item, index) => (
                  <li key={index} className="search-item">
                    <Box
                      onClick={() => handleSearchFromSearchList(item)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1",
                      }}
                    >
                      <StarBorderIcon />
                      {item}
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() => handleRemoveSearch(index, "favorite")}
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
