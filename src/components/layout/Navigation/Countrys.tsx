import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";

import "../../../styles/Navigation.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CustomSkeleton from "../../common/CustomSkeleton";

type item = {
  slug: string;
  name: string;
};

const Countrys = () => {
  const countries = useSelector((state: RootState) => state.movies.countries);

  return (
    <Box>
      <Dropdown>
        <MenuButton variant="plain" color="neutral">
          Quốc gia
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu
          className="countrys"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "360px",
            padding: "8px",
          }}
        >
          {countries.length === 0 && (
            <CustomSkeleton quantity={15} width={106} />
          )}
          {countries.length > 0 &&
            countries.map((item: item, index: number) => (
              <MenuItem key={index} sx={{ borderRadius: "8px", flex: "auto" }}>
                <_NavLink path={`/chi-tiet/${item.slug}`} content={item.name} />
              </MenuItem>
            ))}
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default Countrys;
