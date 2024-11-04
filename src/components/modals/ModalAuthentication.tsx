import { Box, Modal, ModalClose, Sheet } from "@mui/joy";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import ForgotPassword from "../authentication/ForgotPassword";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../../redux/slice/systemSlice";
import { useEffect } from "react";

interface IProps {
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalAuthentication = ({ type, open, setOpen }: IProps) => {
  const dispatch: AppDispatch = useDispatch();


  const handleClose = () => {
    if (type === "forgot-password" || type === "register") {
      dispatch(setType("login"));
    }
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: {
            xs: "90%",
            sm: "500px",
          },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {type === "login" && <Login setOpen={setOpen} />}
          {type === "register" && <Register setOpen={setOpen} />}
          {type === "forgot-password" && <ForgotPassword setOpen={setOpen} />}
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalAuthentication;
