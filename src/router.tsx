import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./auth/layout";
import { LoginPage } from "./auth/pages/login-page";
import { RegisterPage } from "./auth/pages/register-page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        <Route path="/auth" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
