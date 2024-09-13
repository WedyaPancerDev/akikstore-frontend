import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo } from "react";

type TableContainerProps<T> = {
  rows: T[];
  columns: ColDef[];
} & React.ComponentPropsWithoutRef<typeof AgGridReact>;

const TableContainer = <T,>({
  rows,
  columns,
  ...props
}: TableContainerProps<T>): JSX.Element => {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
    };
  }, []);

  return (
    <Box
      component="div"
      className="ag-theme-quartz"
      sx={{ height: "37.5rem", width: "100%" }}
    >
      <AgGridReact
        {...props}
        rowData={rows}
        columnDefs={columns}
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
      />
    </Box>
  );
};

export default TableContainer;
