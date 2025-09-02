// Filtro de estado para usuarios
export type UserFilterStatus = "all" | "active" | "inactive";

// Tipo de usuario
export type UserType = {
  id: number;
  username: string;
  status: "active" | "inactive";
};
