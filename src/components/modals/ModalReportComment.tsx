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
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addReportedComment } from "../../redux/asyncThunk/reportedComment";
import ModalContainer from "./ModalContainer";

type IProps = {
  open: boolean;
  idComment: string;
  setOpen: (open: boolean) => void;
  setIdComment: (id: string) => void;
};

const ModalReportComment = ({
  open,
  idComment,
  setOpen,
  setIdComment,
}: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportingReason, setReportingReason] =
    useState<string>("Nội dung xúc phạm");
  const theme = useSelector((state: RootState) => state.system.theme);
  const handleChangeRadio = (value: string) => {
    setReportingReason(value);
  };

  const handleReport = async () => {
    setIsLoading(true);
    const res = await dispatch(
      addReportedComment({
        idComment,
        reportingReason,
      })
    );

    if (res.payload?.EC === 0) {
      toast.success("Báo cáo thành công!");
    } else {
      toast.error(res.payload?.EM || "Có lỗi xảy ra");
    }

    setIsLoading(false);
    setOpen(false);
    setIdComment("");
  };

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        minWidth: {
          xs: "90%",
          sm: "500px",
        },
        maxWidth: {
          xs: "90%",
          sm: "520px",
        },
        borderRadius: "md",
        p: 3,
        boxShadow: "lg",
      }}
    >
      <Typography level="h4" color={theme === "light" ? "primary" : "neutral"}>
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
            onChange={(event) =>
              handleChangeRadio(event.target.value as string)
            }
            value={reportingReason}
            name="radio-buttons-group"
          >
            <Radio
              value="Nội dung xúc phạm"
              label="Nội dung xúc phạm"
              size="md"
            />
            <Radio value="Lừa đảo" label="Lừa đảo" size="md" />
            <Radio
              value="Quảng cáo không mong muốn"
              label="Quảng cáo không mong muốn"
              size="md"
            />
            <Radio
              value="Thông tin sai lệch"
              label="Thông tin sai lệch"
              size="md"
            />
            <Radio
              value="Hành vi quấy rối"
              label="Hành vi quấy rối"
              size="md"
            />
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
          <Button loading={isLoading} onClick={() => handleReport()}>
            Báo cáo
          </Button>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default ModalReportComment;
