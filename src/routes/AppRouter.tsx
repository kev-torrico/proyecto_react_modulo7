import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, NotFoundPage, UserPage } from "../pages/public";
import { PublicRoute } from "./PublicRouter";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { PerfilPage, TasksPage, UsersPage } from "../pages/private";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userRegister" element={<UserPage />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
