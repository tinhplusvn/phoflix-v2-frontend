import { Box, Button, IconButton, Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ThemeMode from "./ThemeMode";

import _NavLink from "../../common/_NavLink";
import UserOptions from "./UserOptions";
import { useState } from "react";
import ModalSearch from "../../ModalSearch";

type NavRight = {
  width: number;
};

const NavRight = ({ width }: NavRight) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ display: "flex", gap: "16px" }}>
        {width > 1024 ? (
          <>
            <Button
              onClick={() => setOpen(true)}
              variant="outlined"
              color="neutral"
              startDecorator={<SearchIcon color="primary" />}
            >
              Tìm kiếm...
            </Button>
          </>
        ) : (
          <>
            <IconButton onClick={() => setOpen(true)} variant="outlined">
              <SearchIcon color="primary" />
            </IconButton>
          </>
        )}

        <ThemeMode />

        <IconButton variant="outlined">
          <NotificationsNoneIcon color="primary" />
        </IconButton>

        <Button variant="solid">
          <_NavLink path="/dang-nhap" content="Đăng nhập" />
        </Button>

        <UserOptions />
      </Box>

      <ModalSearch open={open} setOpen={setOpen} />
    </>
  );
};

export default NavRight;
