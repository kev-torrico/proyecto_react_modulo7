import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { UserType } from "./types";
import { Box, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ToggleOff as InactiveIcon,
  ToggleOn as ActiveIcon,
} from "@mui/icons-material";
import type { GridSortModel } from "@mui/x-data-grid";

interface Props {
  users: UserType[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  setSortModel: (model: GridSortModel) => void;
  handleDelete: (id: number) => void;
  handleToggleStatus: (id: number, status: "active" | "inactive") => void;
  handleOpenEditDialog: (user: UserType) => void;
}

export const UserTable = ({
  users,
  rowCount,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  handleDelete,
  handleToggleStatus,
  handleOpenEditDialog,
}: Props) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Usuario", flex: 1 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === "active" ? "Activo" : "Inactivo"}
          color={params.value === "active" ? "success" : "default"}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={"row"} spacing={1}>
          {/* Editar */}
          <Tooltip title="Editar">
            <IconButton
              size="small"
              onClick={() => handleOpenEditDialog(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Activar/Inactivar */}
          <Tooltip
            title={
              params.row.status === "active"
                ? "Inactivar usuario"
                : "Activar usuario"
            }
          >
            <IconButton
              size="small"
              color={params.row.status === "active" ? "warning" : "success"}
              onClick={() =>
                handleToggleStatus(params.row.id, params.row.status)
              }
            >
              {params.row.status === "active" ? (
                <InactiveIcon fontSize="small" />
              ) : (
                <ActiveIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {/* Eliminar */}
          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box height={545}>
      <DataGrid
        rows={users}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[5, 10, 20]}
        disableColumnFilter
      />
    </Box>
  );
};
