import {
  Alert,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Sheet,
  Tooltip,
  Typography,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/joy/Divider";
import HistoryIcon from "@mui/icons-material/History";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import _, { debounce } from "lodash";
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
import { searchPreview } from "../../redux/asyncThunk/moviesThunk";

type ModalSearch = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalSearch = ({ open, setOpen }: ModalSearch) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const searchRecent = useSelector(
    (state: RootState) => state.searchHistory.searchRecent
  );
  const searchFavourite = useSelector(
    (state: RootState) => state.searchHistory.searchFavourite
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const width = useSelector((state: RootState) => state.system.width);

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
    const handleShowPreview = async () => {
      if (searchValue.trim() !== "") {
        setIsLoading(true);
        await dispatch(searchPreview(searchValue));
        setIsLoading(false);
      }
    };

    const debouncedSearch = debounce(handleShowPreview, 500);

    debouncedSearch();

    return () => debouncedSearch.cancel();
  }, [searchValue, params?.keyword]);

  const handleSearchInput = async () => {
    if (searchValue === params?.keyword) {
      setOpen(false);
      setSearchValue("");
      return;
    }

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

  const handleClickSearchPreview = (slug: string) => {
    navigate(`/thong-tin/${slug}`);
    setOpen(false);
    setSearchValue("");
  };

  const handleSeeAll = () => {
    navigate(`/tim-kiem/${searchValue}`);
    setOpen(false);
    setSearchValue("");
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

  const handleRemoveSearch = async (id: string) => {
    setIsLoading(true);
    await dispatch(deleteSearchHistory(id));
    await dispatch(getSearchHistory(user?.id as string));
    setIsLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        sx={{
          animation: "scaleIn 0.3s",
          minWidth: {
            xs: "90%",
            sm: "640px",
          },
          maxWidth: {
            xs: "90%",
            sm: "680px",
          },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <Box>
          <Input
            autoFocus
            size="lg"
            onKeyDown={(e) => e.code === "Enter" && handleSearchInput()}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ flex: "1" }}
            color="primary"
            variant="outlined"
            placeholder="Tìm kiếm phim..."
            startDecorator={width > 476 && <SearchIcon color="primary" />}
            endDecorator={
              width > 476 ? (
                <Button
                  size="sm"
                  loading={isLoadingButton}
                  disabled={searchValue === ""}
                  onClick={handleSearchInput}
                  variant="solid"
                >
                  Tìm kiếm
                </Button>
              ) : (
                <IconButton
                  loading={isLoadingButton}
                  disabled={searchValue === ""}
                  onClick={handleSearchInput}
                  variant="solid"
                  color="primary"
                >
                  <SearchIcon />
                </IconButton>
              )
            }
          />
        </Box>

        <Divider sx={{ margin: "12px -24px" }} />

        {isLoading && <SkeletonModalSearch />}

        {searchValue !== "" && !isLoading && (
          <SearchPreview
            handleClickSearchPreview={handleClickSearchPreview}
            handleSeeAll={handleSeeAll}
          />
        )}

        {searchValue === "" && !isLoading && (
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
              <SearchList
                data={searchRecent}
                handleSearch={handleSearchFromSearchList}
                handleRemoveSearch={handleRemoveSearch}
                handleFavouriteSearchHistory={handleFavouriteSearchHistory}
                type="recent"
              />
            )}
            {searchFavourite.length > 0 && (
              <SearchList
                data={searchFavourite}
                handleSearch={handleSearchFromSearchList}
                handleRemoveSearch={handleRemoveSearch}
                type="favorite"
              />
            )}
          </Box>
        )}
      </Sheet>
    </Modal>
  );
};

export default ModalSearch;

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

interface SearchPreviewProps {
  handleClickSearchPreview: (slug: string) => void;
  handleSeeAll: () => void;
}

const SearchPreview = ({
  handleClickSearchPreview,
  handleSeeAll,
}: SearchPreviewProps) => {
  const movies = useSelector((state: RootState) => state.movies.searchPreview);
  const isMobile = useSelector((state: RootState) => state.system.isMobile);

  return (
    <Box
      className="search-list"
      sx={{
        overflowY: "auto",
        height: "70vh",
      }}
    >
      {movies?.length > 0 && (
        <Alert
          startDecorator={<SearchIcon />}
          color="primary"
          sx={{ marginBottom: "12px" }}
        >
          Top {movies?.length} bộ phim phù hợp!
        </Alert>
      )}
      {movies?.map((movie: any, index: number) => (
        <Box
          className="search-item"
          onClick={() => handleClickSearchPreview(movie?.slug)}
          key={index}
          sx={{ display: "flex", gap: "12px", alignItems: "start !important" }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <img
              src={
                (movie?.poster_url as string)?.includes(
                  process.env.REACT_APP_API_HINH_ANH as string
                )
                  ? movie?.poster_url
                  : `${process.env.REACT_APP_API_HINH_ANH as string}/${
                      movie?.poster_url
                    }`
              }
              alt={movie?.name}
            />
          </Box>
          <Box
            sx={{
              width: {
                xs: "calc(100% - 92px)",
                sm: "calc(100% - 132px)",
              },
            }}
          >
            <Typography
              sx={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              color="primary"
              level={isMobile ? "title-sm" : "title-md"}
            >
              {movie?.name}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              level={isMobile ? "body-xs" : "body-md"}
            >
              {movie?.origin_name}
            </Typography>
            <Typography level={isMobile ? "body-xs" : "body-md"}>
              {movie?.time}
            </Typography>
            <Typography level={isMobile ? "body-xs" : "body-md"}>
              {movie?.lang}
            </Typography>
            <Typography level={isMobile ? "body-xs" : "body-md"}>
              {movie?.quality}
            </Typography>
          </Box>
        </Box>
      ))}

      {movies?.length >= 10 && (
        <Button
          size="sm"
          variant="soft"
          sx={{ margin: "16px auto 0 auto" }}
          endDecorator={<ChevronRightIcon />}
          onClick={() => handleSeeAll()}
        >
          Xem tất cả kết quả
        </Button>
      )}
    </Box>
  );
};
