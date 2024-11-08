import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import toast from "react-hot-toast";

const ThemeMode = () => {
  return (
    <Dropdown>
      <MenuButton sx={{ width: "36px", height: "36px", borderRadius: "12px" }}>
        <LightModeOutlinedIcon color="primary" />
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => toast("Đang phát triển!")}>
          <LightModeOutlinedIcon />
          Chế độ sáng
        </MenuItem>
        <MenuItem onClick={() => toast("Đang phát triển!")}>
          <DarkModeOutlinedIcon />
          Chế độ tối
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default ThemeMode;
