import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layout";
import { AuthLayout } from "@/layouts/auth-layout";
import SignInPage from "@/pages/auth/sign-in";
import DashboardPage from "@/pages/dashboard";
import InternsListPage from "@/pages/interns";
import InternNewPage from "@/pages/interns/new";
import InternEditPage from "@/pages/interns/edit";
import TasksListPage from "@/pages/tasks";
import TaskNewPage from "@/pages/tasks/new";
import NotFoundPage from "@/pages/not-found";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/auth/sign-in", element: <SignInPage /> }],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/interns", element: <InternsListPage /> },
      { path: "/interns/new", element: <InternNewPage /> },
      { path: "/interns/:id/edit", element: <InternEditPage /> },
      { path: "/tasks", element: <TasksListPage /> },
      { path: "/tasks/new", element: <TaskNewPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
