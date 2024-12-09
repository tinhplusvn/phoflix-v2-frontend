import { Button, Tooltip } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ButtonSeeMoreProps {
  originalData: any[];
  currentData: any[];
  countDisplay: number;
  setData: (data: any[]) => void;
  title?: string;
}

const ButtonSeeMore = ({
  currentData,
  originalData,
  countDisplay,
  title,
  setData,
}: ButtonSeeMoreProps) => {
  const isMobile = useSelector((state: RootState) => state.system.isMobile);

  const handleSeeMore = () => {
    if (currentData.length < originalData.length) {
      setData(originalData.slice(0, currentData.length + countDisplay));
    }
  };

  return (
    <Tooltip
      color="primary"
      variant="soft"
      title={`Còn ${originalData?.length - currentData?.length} ${title}`}
    >
      <Button
        endDecorator={<ExpandMoreIcon />}
        onClick={handleSeeMore}
        variant="solid"
        sx={{ width: isMobile ? "100%" : "320px" }}
      >
        Xem thêm
      </Button>
    </Tooltip>
  );
};

export default ButtonSeeMore;
