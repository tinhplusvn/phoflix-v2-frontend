import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import _NavLink from "../../common/_NavLink";
import Year from "./Year";
import NavListItem from "./NavListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IUser } from "../../../interfaces/user";

const NavLeft = () => {
  const categories = useSelector((state: RootState) => state.movies.categories);
  const countries = useSelector((state: RootState) => state.movies.countries);
  const user: IUser = useSelector((state: RootState) => state.users.user);

  return (
    <Box sx={{ display: "flex" }}>
      <Dropdown>
        <MenuButton variant="plain">
          Danh mục
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu>
          <MenuItem>
            <_NavLink path="/chi-tiet/danh-sach/phim-le" content="Phim Lẻ" />
          </MenuItem>
          <MenuItem>
            <_NavLink path="/chi-tiet/danh-sach/phim-bo" content="Phim Bộ" />
          </MenuItem>
          <MenuItem>
            <_NavLink
              path="/chi-tiet/danh-sach/hoat-hinh"
              content="Hoạt Hình"
            />
          </MenuItem>
          <MenuItem>
            <_NavLink path="/chi-tiet/danh-sach/tv-shows" content="Tv Shows" />
          </MenuItem>
        </Menu>
      </Dropdown>
      <NavListItem data={categories} describe="the-loai" title="Thể loại" />
      <NavListItem data={countries} describe="quoc-gia" title="Quốc gia" />

      {(user.access_token || user?.refresh_token) && (
        <Dropdown>
          <MenuButton variant="plain">
            Tuỳ chọn
            <KeyboardArrowDownIcon />
          </MenuButton>
          <Menu>
            <MenuItem>
              <HistoryIcon />
              <_NavLink path="/lich-su-da-xem" content="Lịch sử đã xem" />
            </MenuItem>
            <MenuItem>
              <BookmarkBorderIcon />
              <_NavLink path="/phim-da-luu" content="Phim đã lưu" />
            </MenuItem>
          </Menu>
        </Dropdown>
      )}
    </Box>
  );
};

export default NavLeft;
