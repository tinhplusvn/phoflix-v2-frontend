import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  Sheet,
} from "@mui/joy";

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
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Sheet
        variant="outlined"
        sx={{
          animation: "scaleIn 0.3s",
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
      </Sheet>
    </Modal>
  );
};

export default ModalAlertDialog;
