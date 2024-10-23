import {
  Box,
  Button,
  Chip,
  IconButton,
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
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/ModalSearch.scss";

type ModalSearch = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type searchValue = string | undefined;

const ModalSearch = ({ open, setOpen }: ModalSearch) => {
  const [searchValue, setSearchValue] = useState<searchValue>();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/tim-kiem/${searchValue}`);
    setOpen(false);
  };

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ flex: "1" }}
            variant="plain"
            placeholder="Tìm kiếm phim..."
            startDecorator={<SearchIcon color="primary" />}
          />

          <Button
            disabled={searchValue === ""}
            onClick={() => handleSearch()}
            variant="soft"
          >
            Tìm kiếm
          </Button>
        </Box>

        <Divider sx={{ margin: "12px -24px" }} />

        <Box sx={{ height: "360px", overflowY: "auto" }}>
          <Box>
            <Typography
              sx={{ marginBottom: "12px" }}
              level="title-md"
              color="neutral"
            >
              Gần đây
            </Typography>
            <ul className="search-list">
              <li className="search-item">
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <HistoryIcon />
                  Test
                </Box>
                <Box>
                  <IconButton color="primary">
                    <StarBorderIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <ClearIcon />
                  </IconButton>
                </Box>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography
              sx={{ margin: "12px 0" }}
              level="title-md"
              color="neutral"
            >
              Yêu thích
            </Typography>
            <ul className="search-list">
              <li className="search-item">
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <StarBorderIcon />
                  Test
                </Box>
                <Box>
                  <IconButton color="primary">
                    <ClearIcon />
                  </IconButton>
                </Box>
              </li>
            </ul>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ModalSearch;
