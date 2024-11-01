import { Box, Button, FormControl, FormLabel, Modal, ModalClose, Radio, RadioGroup, Sheet, Typography } from "@mui/joy";

type IProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalReportComment = ({ open, setOpen }: IProps) => {
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
            <RadioGroup defaultValue="1" name="radio-buttons-group">
              <Radio value="1" label="Spam" size="md" />
              <Radio value="2" label="Nội dung xúc phạm" size="md" />
              <Radio value="3" label="Lừa đảo" size="md" /> 
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
            <Button>Báo cáo</Button>
          </Box>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalReportComment;
