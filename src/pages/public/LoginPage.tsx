import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { schemaLogin, type LoginFormValues } from "../../models";
import type { ActionState } from "../../interfaces";
import { createInitialStaste, handlerZodError } from "../../helpers";

export type LoginActionState = ActionState<LoginFormValues>;
const initialState = createInitialStaste<LoginFormValues>();

export const LoginPage = () => {
  const loginApi = async (
    _: LoginActionState | undefined,
    formData: FormData
  ) => {
    const rawData: LoginFormValues = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    try {
      schemaLogin.parse(rawData);
    } catch (error) {
      const err = handlerZodError<LoginFormValues>(error, rawData);
      return err;
    }
  };

  const [state, submitAction, isPending] = useActionState(
    loginApi,
    initialState
  );

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Box>
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component={"h1"} variant="h4" gutterBottom>
            LOGIN
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Proyecto Diplomado con React 19
          </Typography>
          {/* ALERTA*/}

          {Object.keys(state?.errors ?? {}).length !== 0 && (
            <Alert severity="error">{state?.message}</Alert>
          )}

          <Box action={submitAction} component={"form"} sx={{ width: "100%" }}>
            <TextField
              name="username"
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              type="text"
              disabled={isPending}
              defaultValue={state?.formData?.username}
              error={!!state?.errors?.username}
              helperText={state?.errors?.username}
            />
            <TextField
              name="password"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              disabled={isPending}
              defaultValue={state?.formData?.password}
              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, heigh: 48 }}
              disabled={isPending}
              startIcon={
                isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isPending ? "Cargando..." : "Login"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
