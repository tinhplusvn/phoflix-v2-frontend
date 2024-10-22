import { Box, Dropdown, Menu, MenuButton, MenuItem, Skeleton } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";

import "../../../styles/Navigation.scss";

type item = {
  slug: string;
  name: string;
};

const Categorys = ({ categorys }: { categorys: any }) => {
  return (
    <Box>
      <Dropdown>
        <MenuButton variant="plain" color="neutral">
          Thể loại
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu
          className="categorys"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "360px",
            padding: "8px",
          }}
        >
          {categorys.length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "106px" }}
              />
            </Box>
          )}
          {categorys.length > 0 &&
            categorys.map((item: item, index: number) => (
              <MenuItem key={index} sx={{ borderRadius: "8px", flex: "auto" }}>
                <_NavLink path={`/chi-tiet/${item.slug}`} content={item.name} />
              </MenuItem>
            ))}
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default Categorys;
