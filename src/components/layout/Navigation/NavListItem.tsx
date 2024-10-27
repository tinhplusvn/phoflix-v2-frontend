import { Box, Dropdown, Menu, MenuButton, MenuItem, Skeleton } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";

import "../../../styles/Navigation.scss";
import SkeletonNav from "../../common/SkeletonNav";

const NavListItem = ({ data, describe, title }: any) => {
  return (
    <Box>
      <Dropdown>
        <MenuButton variant="plain" color="neutral">
          {title}
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
          {data.length === 0 && <SkeletonNav quantity={15} width={106} />}
          {data.length > 0 &&
            data.map((item: any, index: number) => (
              <MenuItem key={index} sx={{ borderRadius: "8px", flex: "auto" }}>
                <_NavLink
                  path={`/chi-tiet/${describe}/${item.slug}`}
                  content={item.name}
                />
              </MenuItem>
            ))}
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default NavListItem;
