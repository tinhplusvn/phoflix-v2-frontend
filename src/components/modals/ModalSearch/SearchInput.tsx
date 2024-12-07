import { Box, Button, IconButton, Input } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  searchValue: string;
  isLoadingButton: boolean;
  handleSearchInput: () => void;
  setSearchValue: (value: string) => void;
}

const SearchInput = ({
  searchValue,
  isLoadingButton,
  handleSearchInput,
  setSearchValue,
}: SearchInputProps) => {
  const width = useSelector((state: RootState) => state.system.width);

  return (
    <Box>
      <Input
        autoFocus
        size="lg"
        onKeyDown={(e) => e.code === "Enter" && handleSearchInput()}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ flex: "1" }}
        color="primary"
        variant="outlined"
        placeholder="Tìm kiếm phim..."
        startDecorator={width > 476 && <SearchIcon color="primary" />}
        endDecorator={
          width > 476 ? (
            <Button
              size="sm"
              loading={isLoadingButton}
              disabled={searchValue === ""}
              onClick={handleSearchInput}
              variant="solid"
            >
              Tìm kiếm
            </Button>
          ) : (
            <IconButton
              loading={isLoadingButton}
              disabled={searchValue === ""}
              onClick={handleSearchInput}
              variant="solid"
              color="primary"
            >
              <SearchIcon />
            </IconButton>
          )
        }
      />
    </Box>
  );
};

export default SearchInput;
