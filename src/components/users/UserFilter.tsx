/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

export type UserFilterStatus = "all" | "active" | "inactive";

interface Props {
  filterStatus: UserFilterStatus;
  setFilterStatus: (status: UserFilterStatus) => void;
  setSearch: (search: string) => void;
}

export const UserFilter = ({
  filterStatus,
  setFilterStatus,
  setSearch,
}: Props) => {
  const [searchFilter, setSearchFilter] = useState("");

  // Retardo para no ejecutar búsqueda en cada tecla
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchFilter);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchFilter]);

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
      <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
        {/* Input de búsqueda */}
        <TextField
          placeholder="Buscar usuario..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchFilter && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchFilter("")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Select de estado */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={filterStatus}
            label="Estado"
            onChange={(e) =>
              setFilterStatus(e.target.value as UserFilterStatus)
            }
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="active">Activo</MenuItem>
            <MenuItem value="inactive">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </Paper>
  );
};
