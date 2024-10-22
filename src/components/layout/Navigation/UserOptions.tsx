import { Divider, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import _NavLink from "../../common/_NavLink";

const UserOptions = () => {
  return (
    <Dropdown>
      <MenuButton sx={{ width: "36px", height: "36px" }}>
        <AccountCircleIcon color="primary"/>
      </MenuButton>
      <Menu>
        <MenuItem>
          <PersonIcon />
          <_NavLink path="/thong-tin-nguoi-dung" content="Thông tin người dùng"/>
        </MenuItem>
        <MenuItem>
          <PasswordIcon />
          Đổi mật khẩu
        </MenuItem>
        <Divider />
        <MenuItem>
          <LogoutIcon />
          Đăng xuất
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default UserOptions;
