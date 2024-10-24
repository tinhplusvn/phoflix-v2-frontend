import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import _NavLink from "../../common/_NavLink";
import Categorys from "./Catetogys";
import Countrys from "./Countrys";

const NavLeft = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Dropdown>
        <MenuButton variant="plain">
          Danh mục
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu>
          <MenuItem>
            {/* <MovieCreationOutlinedIcon /> */}
            <_NavLink path="/chi-tiet/danh-sach/phim-le" content="Phim Lẻ" />
          </MenuItem>
          <MenuItem>
            {/* <MovieFilterOutlinedIcon /> */}
            <_NavLink path="/chi-tiet/danh-sach/phim-bo" content="Phim Bộ" />
          </MenuItem>
          <MenuItem>
            {/* <SlideshowOutlinedIcon /> */}
            <_NavLink
              path="/chi-tiet/danh-sach/hoat-hinh"
              content="Hoạt Hình"
            />
          </MenuItem>
          <MenuItem>
            {/* <LiveTvRoundedIcon /> */}
            <_NavLink path="/chi-tiet/danh-sach/tv-shows" content="Tv Shows" />
          </MenuItem>
        </Menu>
      </Dropdown>

      <Categorys />

      <Countrys />

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
    </Box>
  );
};

export default NavLeft;
