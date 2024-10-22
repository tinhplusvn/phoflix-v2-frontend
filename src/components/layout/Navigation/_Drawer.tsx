import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  ModalClose,
} from "@mui/joy";

import _NavLink from "../../common/_NavLink";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

type _Drawer = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const _Drawer = ({ open, setOpen }: _Drawer) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      sx={[
        open
          ? {
              "--Drawer-transitionDuration": "0.4s",
              "--Drawer-transitionFunction":
                "cubic-bezier(0.79,0.14,0.15,0.86)",
            }
          : {
              "--Drawer-transitionDuration": "0.2s",
              "--Drawer-transitionFunction": "cubic-bezier(0.77,0,0.18,1)",
            },
      ]}
    >
      <ModalClose />
      <Box role="presentation" sx={{ p: 2, marginTop: "24px" }}>
        <List>
          <ListItem startAction={<HomeIcon />}>
            <ListItemButton>
              <_NavLink path="/" content="Trang chủ" />
            </ListItemButton>
          </ListItem>
          <ListItem startAction={<LiveTvRoundedIcon />}>
            <ListItemButton>
              <_NavLink path="/phim-le" content="Phim lẻ" />
            </ListItemButton>
          </ListItem>
          <ListItem startAction={<LiveTvRoundedIcon />}>
            <ListItemButton>
              <_NavLink path="/phim-bo" content="Phim bộ" />
            </ListItemButton>
          </ListItem>
          <ListItem startAction={<LiveTvRoundedIcon />}>
            <ListItemButton>
              <_NavLink path="/hoat-hinh" content="Hoạt hình" />
            </ListItemButton>
          </ListItem>
          <AccordionGroup>
            <Accordion>
              <AccordionSummary>Thể loại</AccordionSummary>
              <AccordionDetails>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
          <AccordionGroup>
            <Accordion>
              <AccordionSummary>Quốc gia</AccordionSummary>
              <AccordionDetails>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
                <ListItem startAction={<LiveTvRoundedIcon />}>
                  <ListItemButton>
                    <_NavLink path="/hoat-hinh" content="Hoạt hình" />
                  </ListItemButton>
                </ListItem>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </List>
        <Divider />
        <List>
          <ListItem startAction={<HistoryIcon />}>
            <ListItemButton>
              <_NavLink path="/lich-su-da-xem" content="Lịch sử đã xem" />
            </ListItemButton>
          </ListItem>
          <ListItem startAction={<BookmarkBorderIcon />}>
            <ListItemButton>
              <_NavLink path="/phim-da-luu" content="Phim đã lưu" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default _Drawer;
