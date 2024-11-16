import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Tooltip,
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
  deleteSearchHistory,
  getSearchHistory,
} from "../../redux/asyncThunk/searchHistoryThunk";
import { addActivityLog } from "../../redux/asyncThunk/activityLogThunk";
import SkeletonModalSearch from "../common/SkeletonModalSearch";
import { IUser } from "../../interfaces/user";

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
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const searchRecent = useSelector(
    (state: RootState) => state.searchHistory.searchRecent
  );
  const searchFavourite = useSelector(
    (state: RootState) => state.searchHistory.searchFavourite
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(getSearchHistory(user?.id as string));
      setIsLoading(false);
    };

    if (user?.access_token || user?.refresh_token) {
      handleInit();
    }
  }, [user]);

  useEffect(() => {
    if (searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleSearchInput = async (actions: actions) => {
    if (searchValue !== "") {
      if (user?.access_token || user?.refresh_token) {
        setIsLoadingButton(true);
        await dispatch(
          addSearchHistory({
            userId: user?.id as string,
            type: "recent",
            keyword: searchValue,
          })
        );
        await dispatch(getSearchHistory(user?.id as string));
        await dispatch(
          addActivityLog({
            userId: user?.id as string,
            action: `Tìm kiếm từ khoá "${searchValue}"`,
          })
        );
        setIsLoadingButton(false);
      }
      navigate(`/tim-kiem/${searchValue}`);
      setSearchValue("");
      setOpen(false);
    }
  };

  const handleSearchFromSearchList = async (value: string) => {
    navigate(`/tim-kiem/${value}`);
    setOpen(false);
    await dispatch(
      addActivityLog({
        userId: user?.id as string,
        action: `Tìm kiếm từ khoá "${value}"`,
      })
    );
    setSearchValue("");
  };

  const handleFavouriteSearchHistory = async (
    keyword: string,
    idSearchHistory: string
  ) => {
    setIsLoading(true);
    await dispatch(
      addSearchHistory({
        userId: user?.id as string,
        type: "favourite",
        keyword,
        idSearchHistory,
      })
    );
    await dispatch(getSearchHistory(user?.id as string));
    setIsLoading(false);
  };

  const handleRemoveSearch = async (item: any) => {
    setIsLoading(true);
    await dispatch(deleteSearchHistory(item));
    await dispatch(getSearchHistory(user?.id as string));
    setIsLoading(false);
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
                size="sm"
                loading={isLoadingButton}
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

        {isLoading && <SkeletonModalSearch />}
        {!isLoading && (
          <Box
            sx={{
              height: "360px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {searchRecent.length === 0 && searchFavourite.length === 0 && (
              <Typography
                sx={{ textAlign: "center" }}
                level="title-lg"
                color="neutral"
              >
                Lịch sử tìm kiếm trống!
              </Typography>
            )}
            {searchRecent.length > 0 && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <Typography level="title-md" color="neutral">
                  Gần đây
                </Typography>
                <ul className="search-list">
                  {searchRecent.map((item: any, index: number) => (
                    <li key={index} className="search-item">
                      <Box
                        onClick={() =>
                          handleSearchFromSearchList(item?.keyword)
                        }
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
                        <Tooltip title="Đánh dấu yếu thích">
                          <IconButton
                            title="Đánh dấu yêu thích"
                            onClick={() =>
                              handleFavouriteSearchHistory(
                                item.keyword,
                                item.id
                              )
                            }
                            color="primary"
                          >
                            <StarBorderIcon />
                          </IconButton>
                        </Tooltip>
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
            )}
            {searchFavourite.length > 0 && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <Typography level="title-md" color="neutral">
                  Yêu thích
                </Typography>
                <ul className="search-list">
                  {searchFavourite.map((item: any, index: number) => (
                    <li key={index} className="search-item">
                      <Box
                        onClick={() =>
                          handleSearchFromSearchList(item?.keyword)
                        }
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
            )}
          </Box>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default ModalSearch;
