import type { AxiosError } from "axios";

export const errorHelper = (error: unknown) => {
  let message =
    (error as any).respone?.data.message ??
    (error as AxiosError).message ??
    "Error Inesperado";

  message =
    (error as AxiosError).status === 401 ? "Debe logearse nuevamente" : message;
};
