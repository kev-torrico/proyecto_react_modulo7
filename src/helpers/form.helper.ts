import type { ActionState } from "../interfaces";

export const createInitialStaste = <T>(): ActionState<T> => {
  return {
    errors: {},
    message: "",
  };
};
