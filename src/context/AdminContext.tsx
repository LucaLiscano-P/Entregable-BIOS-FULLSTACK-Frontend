import { createContext} from "react";
import type { AdminUserCreateRequest, User } from "../types/api.types";

interface AdminContextType {
  users: User[];
  isLoading: boolean;
  getUsers: (page?: number) => Promise<void>; // Agregado parámetro opcional
  createUser: (payload: AdminUserCreateRequest) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export const AdminContext = createContext<AdminContextType | null>(null);