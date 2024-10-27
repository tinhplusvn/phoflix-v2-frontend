import { Box, Button, IconButton } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
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
      <Box sx={{ display: "flex", gap: "16px", maxHeight: "36px" }}>
        {width > 1024 ? (
          <>
            <Button
              sx={{
                padding: "8px",
                justifyContent: "start",
                minWidth: "160px",
              }}
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
