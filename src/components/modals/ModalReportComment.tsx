import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import toast from "react-hot-toast";

type IProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type reportingReason = "SCAM" | "SPAM" | "OFFENSIVE_CONTENT";

const ModalReportComment = ({ open, setOpen }: IProps) => {
  const [reportingReason, setReportingReason] =
    useState<reportingReason>("SPAM");
  const handleReport = () => {
    toast("Đang phát triển!");
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportingReason(event.target.value as reportingReason);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
        <Typography level="h4" color="primary">
          Báo cáo bình luận
        </Typography>
        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <FormControl>
            <FormLabel>Lý do báo cáo?</FormLabel>
            <RadioGroup
              onChange={(event) => handleRadioChange(event)}
              value={reportingReason}
              name="radio-buttons-group"
            >
              <Radio value="SPAM" label="Spam" size="md" />
              <Radio
                value="OFFENSIVE_CONTENT"
                label="Nội dung xúc phạm"
                size="md"
              />
              <Radio value="SCAM" label="Lừa đảo" size="md" />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              justifyContent: "end",
              marginTop: "24px",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              color="neutral"
              variant="plain"
            >
              Huỷ bỏ
            </Button>
            <Button onClick={() => handleReport()}>Báo cáo</Button>
          </Box>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalReportComment;
