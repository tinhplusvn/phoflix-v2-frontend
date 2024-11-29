import { IconButton, Tooltip } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface RefreshButtonProps {
  title?: string;
  isLoading?: boolean;
  handleRefresh?: () => void;
}

const RefreshButton = ({
  title,
  isLoading,
  handleRefresh,
}: RefreshButtonProps) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <RefreshIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default RefreshButton;
