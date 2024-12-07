import { Box, Chip, Modal, Sheet, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

interface ModalListUserRatingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalListUserRating = ({ open, setOpen }: ModalListUserRatingProps) => {
  const rating = useSelector((state: RootState) => state.rating);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          animation: "scaleIn 0.3s",
          maxWidth: "500px",
          minWidth: {
            xs: "90%",
            sm: "400px",
          },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: "300px",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {rating?.listUserRating.length === 0 ? (
            <Typography sx={{ margin: "0 auto" }} level="title-sm">
              Chưa có lượt đánh giá nào!
            </Typography>
          ) : (
            <>
              {rating.listUserRating.map((userRating, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      maxWidth: "240px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    level="title-sm"
                  >
                    {userRating.username}
                  </Typography>
                  <Chip
                    color="primary"
                    endDecorator={<StarBorderRoundedIcon />}
                  >
                    {userRating.rating}
                  </Chip>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalListUserRating;
