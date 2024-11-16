import { Box, Button, IconButton, Link, Tooltip } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import _NavLink from "../../common/_NavLink";
import UserOptions from "./UserOptions";
import { useEffect, useState } from "react";
import ModalSearch from "../../modals/ModalSearch";
import ModalAuthentication from "../../modals/ModalAuthentication";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setType } from "../../../redux/slice/systemSlice";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IUser } from "../../../interfaces/user";

type NavRight = {
  width: number;
};

type Authentication = "login" | "register" | "forgot-password";

const NavRight = ({ width }: NavRight) => {
  const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector(
    (state: RootState) => state.system.isOpenModalAuthentication
  );
  const type = useSelector((state: RootState) => state.system.type);
  const user: IUser = useSelector((state: RootState) => state.users.user);

  const handleAuthentication = (type: Authentication) => {
    dispatch(setOpen(true));
    dispatch(setType(type));
  };

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
                minWidth: "220px",
                borderRadius: "12px",
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;",
              }}
              onClick={() => setOpenModalSearch(true)}
              variant="outlined"
              color="neutral"
              startDecorator={<SearchIcon color="primary" />}
            >
              Tìm kiếm phim...
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

        {!user?.refresh_token ? (
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              size="sm"
              onClick={() => handleAuthentication("login")}
              variant="plain"
            >
              Đăng nhập
            </Button>
            <Button
              size="sm"
              onClick={() => handleAuthentication("register")}
              variant="solid"
            >
              Đăng ký
            </Button>
          </Box>
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
