import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import _NavLink from "../../common/_NavLink";
import Categorys from "./Catetogys";
import Countrys from "./Countrys";
import { useEffect, useState } from "react";
import axios from "axios";

type categoryList = {
  name: string;
  slug: string;
};

type countryList = {
  name: string;
  slug: string;
};

const NavLeft = () => {
  const [categoryList, setCategoryList] = useState<categoryList[]>([]);
  const [countryList, setCountryList] = useState<countryList[]>([]);

  useEffect(() => {
    const handleGetCategoryList = async () => {
      const res = await axios.get("https://phimapi.com/the-loai");
      const res1 = await axios.get("https://phimapi.com/quoc-gia");

      setTimeout(() => {
          setCategoryList(res.data);
          setCountryList(res1.data);
      }, 0)
    };

    handleGetCategoryList();
  }, []);

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

      <Categorys categorys={categoryList} />

      <Countrys countrys={countryList} />

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
