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
import { AppDispatch } from "../../../redux/store";

import _Drawer from "./_Drawer";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountries());
  }, []);

  return (
    <>
      <Box className="navigation">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {width < 1024 && (
            <IconButton
              sx={{ marginRight: "12px" }}
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {width > 1024 && (
            <>
              <Typography
                color="primary"
                level="title-md"
                sx={{ marginRight: "12px" }}
              >
                <_NavLink path="/" content="PHOFLIX-V2" />
              </Typography>
              <NavLeft />
            </>
          )}
        </Box>
        <NavRight width={width} />
      </Box>

      {width < 1024 && <_Drawer open={open} setOpen={setOpen} />}
    </>
  );
};

export default Navigation;
