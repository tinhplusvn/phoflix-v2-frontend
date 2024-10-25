import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";
import { useEffect } from "react";

const Year = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );


  return (
    <Box>
      <Dropdown>
        <MenuButton variant="plain" color="neutral">
          Năm
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu
          className="countrys"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "360px",
            height: "360px",
            overflowY: "auto",
            padding: "8px",
          }}
        >
          {years.map((year, index) => (
            <MenuItem key={index} sx={{ borderRadius: "8px", flex: "auto" }}>
              <_NavLink
                path={`/chi-tiet/nam/${year}`}
                content={year.toString()}
              />
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default Year;
