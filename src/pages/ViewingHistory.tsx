import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/MovieList";
import { useEffect, useState } from "react";
import SkeletonPage from "../components/common/SkeletonPage";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ModalAlertDialog from "../components/ModalAlertDialog";
import { clearViewingHistory } from "../redux/slice/viewingHistorySlice";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";

const ViewingHistory = () => {
  const viewingHistory = useSelector(
    (state: RootState) => state.viewingHistory
  );
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = ["Lịch sử đã xem"];

  const handleClearViewingHistory = () => {
    dispatch(clearViewingHistory());
  };

  if (viewingHistory.length === 0) {
    return <SkeletonPage page="viewing-history" />;
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Alert
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography startDecorator={<HistoryOutlinedIcon />} level="h4">
            Lịch sử xem gần đây
          </Typography>
          <Button onClick={() => setOpen(true)} color="danger" variant="solid">
            Xoá lịch sử
          </Button>
        </Alert>
        <MovieList movies={viewingHistory} page="viewingHistory" />
      </Box>

      <ModalAlertDialog
        open={open}
        setOpen={setOpen}
        handleSubmid={handleClearViewingHistory}
        title="Xoá lịch sử đã xem"
        content="Lịch sử đã xem gần đây của bạn sẽ bị xoá vĩnh viễn?"
      />
    </>
  );
};

export default ViewingHistory;
