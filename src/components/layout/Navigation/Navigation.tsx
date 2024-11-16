import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import _NavLink from "../../common/_NavLink";
import Typography from "@mui/joy/Typography";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import MenuIcon from "@mui/icons-material/Menu";
import "../../../styles/Navigation.scss";
import { IconButton } from "@mui/joy";
import {
  getCategories,
  getCountries,
} from "../../../redux/asyncThunk/moviesThunk";
import { AppDispatch, RootState } from "../../../redux/store";

import _Drawer from "./_Drawer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/user";

const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const width = useSelector((state: RootState) => state.system.width);
  const user: IUser = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountries());
  }, []);

  return (
    <>
      <Box className="navigation">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {width < 1200 && (
            <IconButton
              sx={{ marginRight: "12px", borderRadius: "12px" }}
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {(width > 1200 || user?.access_token) && (
            <Typography
              color="primary"
              level="title-md"
              onClick={() => navigate("/")}
              sx={{
                marginRight: "12px",
                cursor: "pointer",
              }}
            >
              PHOFLIX-V2
            </Typography>
          )}

          {width > 1200 && <NavLeft />}
        </Box>
        <NavRight width={width} />
      </Box>

      {width < 1200 && <_Drawer open={open} setOpen={setOpen} />}
    </>
  );
};

export default Navigation;
