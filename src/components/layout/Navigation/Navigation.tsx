import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import _NavLink from "../../common/_NavLink";
import Typography from "@mui/joy/Typography";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import MenuIcon from "@mui/icons-material/Menu";
import "../../../styles/Navigation.scss";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
} from "@mui/joy";

import _Drawer from "./_Drawer";

const Navigation = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
