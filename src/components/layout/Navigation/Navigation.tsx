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

const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const width = useSelector((state: RootState) => state.system.width);

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

          {width > 1200 && (
            <>
              <Typography
                color="primary"
                level="title-md"
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  marginRight: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#0b6bcb",
                    transition: ".3s",
                  },
                }}
              >
                PHOFLIX-V2
              </Typography>
              <NavLeft />
            </>
          )}
        </Box>
        <NavRight width={width} />
      </Box>

      {width < 1200 && <_Drawer open={open} setOpen={setOpen} />}
    </>
  );
};

export default Navigation;
