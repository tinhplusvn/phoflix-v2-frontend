import {
  Box,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { useState } from "react";

type IProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type selectedDevice = "computer" | "phone" | null;

const ModalInstructDowload = ({ open, setOpen }: IProps) => {
  const [selectedDevice, setSelectedDeivce] =
    useState<selectedDevice>("computer");

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: "90%", md: "50%" },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: 'wrap' }}>
          <Typography level="h4" textColor="inherit" sx={{ mb: 1 }}>
            Hướng dẫn tải video
          </Typography>
          <Select
            defaultValue={selectedDevice}
            onChange={(event, value) => setSelectedDeivce(value)}
          >
            <Option value="computer">Máy tính</Option>
            <Option value="phone">Điện thoại</Option>
          </Select>
        </Box>
        {selectedDevice === "computer" ? (
          <Box sx={{ marginTop: "12px" }}>
            <Typography level="body-md">
              1. Nếu bạn chưa có, tải và cài đặt VLC Media Player từ trang chủ:
              VLC Media Player
            </Typography>

            <Typography level="body-md">
              2. Khởi động ứng dụng VLC Media Player
            </Typography>

            <Typography level="body-md">
              3. Vào menu "Media" và chọn "Open Network Stream" hoặc nhấn Ctrl +
              N
            </Typography>

            <Typography level="body-md">
              4. Dán link M3U8 của video vào ô URL và nhấn "Play"
            </Typography>

            <Typography level="body-md">
              5. Để tải video, vào menu "Media" và chọn "Convert/Save"
            </Typography>

            <Typography level="body-md">
              6/ Trong tab "Network", dán lại link M3U8 và nhấn "Convert/Save".
            </Typography>

            <Typography level="body-md">
              7. Trong phần "Destination", chọn đường dẫn và định dạng tệp để
              lưu video.
            </Typography>

            <Typography level="body-md">
              8. Nhấn "Start" để bắt đầu tải video.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ marginTop: "12px" }}>
            <Typography level="title-md">Hệ điều hành Android</Typography>
            <Typography level="body-md">
              1. Tải xuống TubeMate từ trang web chính thức
            </Typography>
            <Typography level="body-md">
              2.Mở ứng dụng và dán liên kết video M3U8 hoặc tìm video bạn muốn
              tải
            </Typography>
            <Typography level="body-md">
              3. Nhấn vào nút tải xuống và chọn định dạng video mong muốn
            </Typography>
            <Typography level="title-md" sx={{ marginTop: "12px" }}>
              Hệ điều hành IOS
            </Typography>
            <Typography level="body-md">
              1. Tải xuống và cài đặt ứng dụng Documents by Readdle
            </Typography>
            <Typography level="body-md">
              2. Mở trình duyệt trong ứng dụng và dán liên kết M3U8
            </Typography>
            <Typography level="body-md">
              3. Tải video và lưu vào thư viện
            </Typography>
          </Box>
        )}
      </Sheet>
    </Modal>
  );
};

export default ModalInstructDowload;
