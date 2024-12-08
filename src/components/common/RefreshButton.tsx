import { IconButton, Tooltip } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";

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
          <CircularProgress size="sm" />
        ) : (
          <RefreshIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default RefreshButton;
