import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LoginPage, NotFoundPage, UserPage } from "../pages/public";
import { PublicRoute } from "./PublicRouter";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { PerfilPage, TasksPage } from "../pages/private";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="./login" />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/userRegister" element={<UserPage />}></Route>
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/perfil" element={<PerfilPage />}></Route>
          <Route path="/tasks" element={<TasksPage />}></Route>
        </Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </HashRouter>
  );
};
