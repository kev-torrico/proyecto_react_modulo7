import z from "zod";
import type { ActionState } from "../interfaces";
import { errorHelper } from "./error.helper";

export const createInitialStaste = <T>(): ActionState<T> => {
  return {
    errors: {},
    message: "",
  };
};

export const handlerZodError = <T>(error: unknown, rawData: Partial<T>) => {
  if (error instanceof z.ZodError) {
    const fieldError: Partial<Record<keyof T, string>> = {};
    error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof T;
      fieldError[field] = issue.message;
    });
    return {
      errors: fieldError,
      message: "Por favor corrige los errores en el formulario",
      formData: rawData,
    };
  }
  return {
    errors: {},
    message: errorHelper(error),
    formData: rawData,
  };
};
