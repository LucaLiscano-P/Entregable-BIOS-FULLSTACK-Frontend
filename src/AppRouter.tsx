import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreatePostPage } from "./pages/CreatePostPage";
import SettingsPage from "./pages/SettingsPage";
import { GuestRoute } from "./components/GuestRoute";
import { AdminProvider } from "./context/AdminProvider";
import { EditPostPage } from "./pages/EditPostPage";
import CategoryPage from "./pages/CategoryPage";
import PostPage from "./pages/PostPage";
import ProductsbyCategoryPage from "./pages/ProductsbyCategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
        <AdminProvider>
          <Dashboard />
        </AdminProvider>
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/create-post",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
        <CreatePostPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/edit-post/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
        <EditPostPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/categories",
    element: <CategoryPage />,
  },

  {
    path: "/categories/:id",
    element: <ProductsbyCategoryPage />,
  },

  {
    path: "/post/:id",
    element: <PostPage />,
  },

  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
