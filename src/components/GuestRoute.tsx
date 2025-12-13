import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-950 to-black">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // 👇 Si ya está logueado, redirigís al lugar que quieras y dependiendo del rol nos enviara a diferente pagina
  if (isAuthenticated()) {
    if (user?.rol === "admin" || user?.rol === "superadmin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }    
  }

  // 👇 Si NO está logueado, puede ver la página (login, register, etc.)
  return <>{children}</>;
}