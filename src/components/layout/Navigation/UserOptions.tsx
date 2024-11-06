import { Divider, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import _NavLink from "../../common/_NavLink";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/asyncThunk/userThunk";
import { useNavigate } from "react-router-dom";

const UserOptions = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    if (window.location.pathname === "/thong-tin-nguoi-dung") {
      navigate("/");
    }
  };

  return (
    <Dropdown>
      <MenuButton
        sx={{
          width: "36px",
          height: "36px",
          borderRadius: "12px",
          boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;",
        }}
      >
        <AccountCircleIcon color="primary" />
      </MenuButton>
      <Menu>
        <MenuItem>
          <PersonIcon />
          <_NavLink
            path="/thong-tin-nguoi-dung"
            content="Thông tin người dùng"
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleLogout()}>
          <LogoutIcon />
          Đăng xuất
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default UserOptions;
