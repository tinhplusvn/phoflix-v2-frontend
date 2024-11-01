import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";

interface IProps {
  open: boolean;
  title: string;
  content: string;
  setOpen: (open: boolean) => void;
  handleSubmit: () => void;
}

const ModalAlertDialog = ({
  open,
  setOpen,
  handleSubmit,
  title,
  content,
}: IProps) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={handleSubmit}>
            Xác nhận
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Huỷ bỏ
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ModalAlertDialog;
