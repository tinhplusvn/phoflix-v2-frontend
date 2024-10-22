import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


const ThemeMode = () => {
  return (
    <Dropdown>
      <MenuButton sx={{ width: "36px", height: "36px" }}>
        <LightModeOutlinedIcon color="primary"/>
      </MenuButton>
      <Menu>
        <MenuItem>
          <LightModeOutlinedIcon />
          Chế độ sáng
        </MenuItem>
        <MenuItem>
          <DarkModeOutlinedIcon />
          Chế độ tối
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default ThemeMode;
