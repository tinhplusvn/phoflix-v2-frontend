import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import _NavLink from "../../common/_NavLink";
import Categorys from "./Catetogys";
import Countrys from "./Countrys";
import { useEffect, useState } from "react";

const NavLeft = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Dropdown>
        <MenuButton variant="plain">
          Kho Phim
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu>
          <MenuItem>
            <LiveTvRoundedIcon />
            <_NavLink path="/chi-tiet/phim-le" content="Phim lẻ" />
          </MenuItem>
          <MenuItem>
            <LiveTvRoundedIcon />
            <_NavLink path="/chi-tiet/phim-bo" content="Phim bộ" />
          </MenuItem>
          <MenuItem>
            <LiveTvRoundedIcon />
            <_NavLink path="/chi-tiet/hoat-hinh" content="Hoạt hình" />
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
