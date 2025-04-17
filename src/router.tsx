import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PrivateRoute } from "./auth/components/private-route";
import AuthLayout from "./auth/layout";
import { LoginPage } from "./auth/pages/login-page";
import { RegisterPage } from "./auth/pages/register-page";
import { checkAuth } from "./fake/fake-data";
import { sleep } from "./lib/sleep";

const ChatLayout = lazy(async () => {
  await sleep(1500);
  return import("./chat/layout/chat-layout");
});
const ChatPage = lazy(async () => {
  await sleep(1500);
  return import("./chat/pages/chat-page");
});
const NotChatSelected = lazy(async () => {
  await sleep(1500);
  return import("./chat/pages/not-chat-selected");
});

export const AppRouter = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      return checkAuth(token);
    },
    retry: false,
  });
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/chat"
          element={
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <PrivateRoute isAuthenticated={!!user}>
                <ChatLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<NotChatSelected />} />
          <Route path="/chat/:clientId" element={<ChatPage />} />
        </Route>
        <Route path="/auth" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
