import { useCallback, useState } from "react";
import { AdminContext } from "./AdminContext";
import { adminService } from "../services/admin.service";
import type { User } from "../types/api.types";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0, // Total de usuarios
    page: 1, // Página actual
    pages: 1, // Total de páginas
    limit: 10, // Usuarios por página
  });

  const getUsers = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await adminService.getUsers(page);
      setUsers(response.data.posts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = async (payload: any) => {
    try {
      const user = await adminService.create(payload);
      setUsers((prev) => [...prev, user]);
      return user;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  };

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        await adminService.delete(id);
        // Recargar la página actual después de eliminar
        await getUsers(pagination.page);
      } catch (error) {
        console.error("Error al eliminar al usuario:", error);
        throw error;
      }
    },
    [pagination.page, getUsers]
  );

  return (
    <AdminContext.Provider
      value={{ users, isLoading, pagination, getUsers, createUser, deleteUser }}
    >
      {children}
    </AdminContext.Provider>
  );
};
