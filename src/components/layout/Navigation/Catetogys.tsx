import { Box, Dropdown, Menu, MenuButton, MenuItem, Skeleton } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";

import "../../../styles/Navigation.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import CustomSkeleton from "../../common/CustomSkeleton";

type item = {
  slug: string;
  name: string;
};

const Categorys = () => {
  const categories = useSelector((state: RootState) => state.movies.categories);

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
          {categories.length === 0 && (
            <CustomSkeleton quantity={15} width={106} />
          )}
          {categories.length > 0 &&
            categories.map((item: item, index: number) => (
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
