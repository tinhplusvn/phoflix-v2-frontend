import { Modal, Sheet } from "@mui/joy";

interface ModalContainerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  sx?: any;
}

const ModalContainer = ({
  open,
  setOpen,
  children,
  sx,
}: ModalContainerProps) => {
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Sheet variant="outlined" sx={sx}>
        {children}
      </Sheet>
    </Modal>
  );
};

export default ModalContainer;
