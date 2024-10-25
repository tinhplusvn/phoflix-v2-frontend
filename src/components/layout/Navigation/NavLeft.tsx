import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import _NavLink from "../../common/_NavLink";
import Categorys from "./Catetogys";
import Countrys from "./Countrys";
import Year from "./Year";

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

      <Categorys />

      <Countrys />  

      <Year/>

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
