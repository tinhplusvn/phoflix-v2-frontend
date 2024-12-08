import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, useColorScheme } from "@mui/joy";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { changeTheme } from "../../../redux/slice/systemSlice";
import toast from "react-hot-toast";

const ThemeToggle = () => {
  const dispatch: AppDispatch = useDispatch();
  const { mode, setMode } = useColorScheme();

  const handleChangeTheme = (theme: "light" | "dark") => {
    dispatch(changeTheme(theme));
    setMode(theme);
    toast.success(`Chế độ ${theme === "light" ? "sáng" : "tối"}`);
  };

  return (
    <>
      <IconButton
        sx={{ borderRadius: "12px" }}
        variant="outlined"
        color="neutral"
        onClick={() => handleChangeTheme(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
    </>
  );
};

export default ThemeToggle;
