import {
  CircularProgress,
  Divider,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import _NavLink from "../../common/_NavLink";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/asyncThunk/userThunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const UserOptions = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const res = await dispatch(logout());
    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <Dropdown>
      <MenuButton
        loading={isLoading}
        sx={{
          width: "36px",
          height: "36px",
          borderRadius: "12px",
          boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;",
        }}
      >
        {!isLoading && <AccountCircleIcon color="primary" />}
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
