import { Box } from "@mui/material";
import {
  UserDialog,
  UserFilter,
  UserHeader,
  UserTable,
  type UserActionState,
} from "../../components";
import { useEffect, useState } from "react";
import type { UserType, UserFilterStatus } from "../../components/users/type";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useAlert, useAxios } from "../../hooks";
import { errorHelper, handlerZodError } from "../../helpers";
import { schemaUser, type UserFormValues } from "../../models";

export const UsersPage = () => {
  const { showAlert } = useAlert();
  const axios = useAxios();

  const [filterStatus, setFilterStatus] = useState<UserFilterStatus>("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    listUsersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterStatus, paginationModel, sortModel]);

  const listUsersApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get("/users", {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          orderBy,
          orderDir,
          search,
          status: filterStatus === "all" ? undefined : filterStatus,
        },
      });
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUser(null);
  };

  const handleOpenEditDialog = (user: UserType) => {
    setOpenDialog(true);
    setUser(user);
  };

  const handleCreateEdit = async (
    _: UserActionState | undefined,
    formdata: FormData
  ) => {
    const rawData: UserFormValues = {
      username: formdata.get("username") as string,
      password: formdata.get("password") as string,
      confirmPassword: formdata.get("confirmPassword") as string,
      status: formdata.get("status") as "active" | "inactive",
    };

    try {
      schemaUser.parse(rawData);
      if (user?.id) {
        await axios.put(`/users/${user.id}`, rawData);
        showAlert("Usuario editado", "success");
      } else {
        await axios.post("/users", rawData);
        showAlert("Usuario creado", "success");
      }
      listUsersApi();
      handleCloseDialog();
      return;
    } catch (error) {
      const err = handlerZodError<UserFormValues>(error, rawData);
      showAlert(err.message, "error");
      return err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm(
        "¿Estas seguro de eliminar este usuario?"
      );
      if (!confirmed) return;

      await axios.delete(`/users/${id}`);
      showAlert("Usuario eliminado", "success");
      listUsersApi();
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  const handleToggleStatus = async (
    id: number,
    status: "active" | "inactive"
  ) => {
    try {
      const confirmed = window.confirm(
        `¿Estas seguro de cambiar el estado del usuario?`
      );
      if (!confirmed) return;

      const newStatus = status === "active" ? "inactive" : "active";
      await axios.patch(`/users/${id}`, { status: newStatus });
      showAlert("Estado del usuario modificado", "success");
      listUsersApi();
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header con título y botón agregar */}
      <UserHeader handleOpenCreateDialog={handleOpenCreateDialog} />

      {/* Barra de herramientas con filtros y búsqueda */}
      <UserFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSearch={setSearch}
      />

      {/* Tabla */}
      <UserTable
        users={users}
        rowCount={total}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        handleDelete={handleDelete}
        handleToggleStatus={handleToggleStatus}
        handleOpenEditDialog={handleOpenEditDialog}
      />

      {/* Dialog */}
      <UserDialog
        open={openDialog}
        user={user}
        onClose={handleCloseDialog}
        handleCreateEdit={handleCreateEdit}
      />
    </Box>
  );
};
