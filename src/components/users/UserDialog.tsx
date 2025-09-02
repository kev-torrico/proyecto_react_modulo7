import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { UserType } from "./types";
import { useActionState } from "react";
import type { ActionState } from "../../interfaces";
import type { UserFormValues } from "../../models";
import { createInitialState } from "../../helpers";
import { useState } from "react";

export type UserActionState = ActionState<UserFormValues>;

interface Props {
  open: boolean;
  user?: UserType | null;
  onClose: () => void;
  handleCreateEdit: (
    _: UserActionState | undefined,
    formData: FormData
  ) => Promise<UserActionState | undefined>;
}

export const UserDialog = ({
  open,
  user,
  onClose,
  handleCreateEdit,
}: Props) => {
  const initialState = createInitialState<UserFormValues>();
  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
      <Box key={user?.id ?? "new"} component={"form"} action={submitAction}>
        <DialogContent>
          <TextField
            name="username"
            autoFocus
            margin="dense"
            label="Usuario"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.username || user?.username || ""}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />

          <TextField
            name="password"
            margin="dense"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            fullWidth
            required={!user} // obligatorio si es nuevo usuario
            variant="outlined"
            disabled={isPending}
            defaultValue=""
            error={!!state?.errors?.password}
            helperText={state?.errors?.password}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="confirmPassword"
            margin="dense"
            label="Confirmar contraseña"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            required={!user}
            variant="outlined"
            disabled={isPending}
            defaultValue=""
            error={!!state?.errors?.confirmPassword}
            helperText={state?.errors?.confirmPassword}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Estado</InputLabel>
            <Select
              name="status"
              defaultValue={state?.formData?.status || user?.status || "active"}
              disabled={isPending}
              label="Estado"
            >
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="inactive">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={20} /> : null}
          >
            {user ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
