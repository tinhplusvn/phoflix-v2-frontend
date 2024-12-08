import { Box, Button, Table, Typography } from "@mui/joy";
import HistoryIcon from "@mui/icons-material/History";
import { formatDate, scrollToTop } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ToggleShowItem from "../../components/common/ToggleShowItem";
import { useEffect, useState } from "react";

const TableActivitiesUser = ({ setOpenModalAlertDialog }: any) => {
  const activityFromStore = useSelector(
    (state: RootState) => state.activityLog.activityList
  );
  const [typeShowActivity, setTypeShowActivity] = useState<string>("collapse");
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    setActivityList(activityFromStore.slice(0, 10));
  }, [activityFromStore]);

  const handleShowEpisodes = (activity: any, type: string) => {
    setActivityList(activity);
    setTypeShowActivity(type);
    type === "collapse" && scrollToTop();
  };

  return (
    <Box
      sx={{
        border: "1px solid rgba(61, 71, 81, 0.3)",
        padding: "16px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          startDecorator={<HistoryIcon />}
          level="title-lg"
          color="primary"
        >
          Lịch sử hoạt động
        </Typography>
        {activityList.length > 0 && (
          <Button
            onClick={() => setOpenModalAlertDialog(true)}
            size="sm"
            color="danger"
          >
            Xoá lịch sử
          </Button>
        )}
      </Box>
      <Table sx={{ marginTop: "12px" }} aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "75%" }}>Tên hoạt động</th>
            <th style={{ width: "25%" }}>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {activityList.length === 0 && (
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                <Typography
                  sx={{ marginTop: "12px" }}
                  level="title-md"
                  color="primary"
                >
                  Không có hoạt động nào gần đây!
                </Typography>
              </td>
            </tr>
          )}
          {activityList.length > 0 &&
            activityList.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ wordBreak: "break-word" }}>{item?.action}</td>
                <td style={{ wordBreak: "break-word" }}>
                  {formatDate(item?.createdAt)}
                </td>
              </tr>
            ))}
        </tbody>
        {activityFromStore.length > 10 && (
          <Box sx={{ marginTop: "24px" }}>
            <ToggleShowItem
              type={typeShowActivity}
              data={activityFromStore}
              quantity={10}
              text="hoạt động"
              location="start"
              handleShowItem={handleShowEpisodes}
            />
          </Box>
        )}
      </Table>
    </Box>
  );
};

export default TableActivitiesUser;
