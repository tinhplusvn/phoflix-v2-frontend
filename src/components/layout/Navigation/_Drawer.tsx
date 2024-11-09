import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ModalClose,
} from "@mui/joy";

import _NavLink from "../../common/_NavLink";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IUser } from "../../../interfaces/user";

type _Drawer = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const _Drawer = ({ open, setOpen }: _Drawer) => {
  const categories = useSelector((state: RootState) => state.movies.categories);
  const countries = useSelector((state: RootState) => state.movies.countries);
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => setOpen(false), [params]);

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
          <ListItem>
            <ListItemButton onClick={() => navigate("/")}>
              Trang chủ
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => navigate("/chi-tiet/danh-sach/phim-le")}
            >
              Phim lẻ
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => navigate("/chi-tiet/danh-sach/phim-bo")}
            >
              Phim bộ
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => navigate("/chi-tiet/danh-sach/hoat-hinh")}
            >
              Phim hoạt hình
            </ListItemButton>
          </ListItem>
          <AccordionGroup>
            <Accordion>
              <AccordionSummary>Thể loại</AccordionSummary>
              <AccordionDetails>
                {categories.length > 0 &&
                  categories.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemButton
                        onClick={() =>
                          navigate(`/chi-tiet/the-loai/${item.slug}`)
                        }
                      >
                        {item.name}
                      </ListItemButton>
                    </ListItem>
                  ))}
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
          <AccordionGroup>
            <Accordion>
              <AccordionSummary>Quốc gia</AccordionSummary>
              <AccordionDetails>
                {countries.length > 0 &&
                  countries.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemButton
                        onClick={() =>
                          navigate(`/chi-tiet/quoc-gia/${item.slug}`)
                        }
                      >
                        {item.name}
                      </ListItemButton>
                    </ListItem>
                  ))}
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </List>
        {(user?.access_token || user?.refresh_token) && (
          <Box>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton>
                  <_NavLink path="/lich-su-da-xem" content="Lịch sử đã xem" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <_NavLink path="/phim-da-luu" content="Phim đã lưu" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default _Drawer;
