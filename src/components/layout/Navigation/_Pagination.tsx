import { Stack } from "@mui/joy";
import { Experimental_CssVarsProvider, Pagination } from "@mui/material";

interface IPagination {
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number | undefined;
  currentPage: number | undefined;
}

const _Pagination = ({
  handleChange,
  totalPages,
  currentPage,
}: IPagination) => {
  return (
    <>
      <Experimental_CssVarsProvider>
        <Stack spacing={2} sx={{ marginTop: "24px", alignItems: "center" }}>
          <Pagination
            sx={{
              backgroundColor: "#fff",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid rgba(61, 71, 81, 0.3)",
            }}
            color="primary"
            onChange={handleChange}
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Experimental_CssVarsProvider>
    </>
  );
};

export default _Pagination;
