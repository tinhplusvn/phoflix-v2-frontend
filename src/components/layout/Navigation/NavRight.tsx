import { Box, Button, IconButton } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import ThemeMode from "./ThemeMode";

import _NavLink from "../../common/_NavLink";
import UserOptions from "./UserOptions";
import { useEffect, useState } from "react";
import ModalSearch from "../../modals/ModalSearch";
import ModalAuthentication from "../../modals/ModalAuthentication";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../../redux/slice/systemSlice";

type NavRight = {
  width: number;
};

const NavRight = ({ width }: NavRight) => {
  const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector(
    (state: RootState) => state.system.isOpenModalAuthentication
  );
  const type = useSelector((state: RootState) => state.system.type);
  const user = useSelector((state: RootState) => state.users.user);

  const handleSetOpen = (isOpen: boolean) => {
    dispatch(setOpen(isOpen));
  };

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
                borderRadius: "12px",
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;",
              }}
              onClick={() => setOpenModalSearch(true)}
              variant="outlined"
              color="neutral"
              startDecorator={<SearchIcon color="primary" />}
            >
              Tìm kiếm ...
            </Button>
          </>
        ) : (
          <>
            <IconButton
              sx={{
                borderRadius: "12px",
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;",
              }}
              onClick={() => setOpenModalSearch(true)}
              variant="outlined"
            >
              <SearchIcon color="primary" />
            </IconButton>
          </>
        )}

        <ThemeMode />

        {!user?.refresh_token ? (
          <Button onClick={() => handleSetOpen(true)} variant="solid">
            Đăng nhập
          </Button>
        ) : (
          <UserOptions />
        )}
      </Box>

      <ModalSearch open={openModalSearch} setOpen={setOpenModalSearch} />

      <ModalAuthentication type={type} open={open} setOpen={handleSetOpen} />
    </>
  );
};

export default NavRight;
