import {
  Box,
  Button,
  Chip,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/joy/Divider";
import HistoryIcon from "@mui/icons-material/History";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";

type ModalSearch = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalSearch = ({ open, setOpen }: ModalSearch) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog sx={{ minWidth: "50%" }} layout="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Input
            sx={{ flex: "1" }}
            variant="plain"
            placeholder="Tìm kiếm phim..."
            startDecorator={<SearchIcon color="primary" />}
          />

          <Button variant="soft">Tìm kiếm</Button>
        </Box>

        <Divider sx={{ margin: "12px -24px" }} />

        <Box sx={{ height: "360px", overflowY: "auto" }}>
          <Box>
            <Typography sx={{ marginBottom: "12px" }} level="h4">
              Gần đây
            </Typography>
            <ul
              style={{
                padding: 0,
                margin: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",

                paddingRight: "12px",
              }}
            >
              <li
                style={{
                  padding: "16px",
                  border: "1px solid #cdd7e1",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <HistoryIcon />
                Test
              </li>
            </ul>
          </Box>
          <Box>
            <Typography sx={{ margin: "12px 0" }} level="h4">
              Yêu thích
            </Typography>
            <ul
              style={{
                padding: 0,
                margin: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingRight: "12px",
              }}
            >
              <li
                style={{
                  padding: "16px",
                  border: "1px solid #cdd7e1",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <StarBorderIcon />
                Test
              </li>
            </ul>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ModalSearch;
