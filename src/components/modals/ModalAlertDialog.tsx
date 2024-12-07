import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  Sheet,
} from "@mui/joy";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IProps {
  open: boolean;
  title: string;
  content: string;
  setOpen: (open: boolean) => void;
  handleSubmit: () => void;
  isLoading?: boolean;
}

const ModalAlertDialog = ({
  open,
  setOpen,
  handleSubmit,
  title,
  content,
  isLoading,
}: IProps) => {
  const isMobile = useSelector((state: RootState) => state.system.isMobile);

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        minWidth: {
          xs: "90%",
          md: "320px",
        },
        maxWidth: {
          xs: "90%",
          md: "360px",
        },
        borderRadius: "md",
        p: 2,
        boxShadow: "lg",
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider sx={{ margin: "12px -16px" }} />
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{ marginTop: "32px" }}>
        <Button
          loading={isLoading}
          variant="solid"
          color="danger"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
        <Button
          sx={{ marginRight: "12px" }}
          variant="plain"
          color="neutral"
          onClick={() => setOpen(false)}
        >
          Huỷ bỏ
        </Button>
      </DialogActions>
    </ModalContainer>
  );
};

export default ModalAlertDialog;
