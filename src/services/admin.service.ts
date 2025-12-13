import type {
  AdminUserCreateRequest,
  AdminUserCreateResponse,
  AdminUsersResponse,
  User,
} from "../types/api.types";
import { apiClient } from "./api.client";

export const adminService = {
  getUsers: async (page = 1, limit = 10): Promise<AdminUsersResponse> => {
    const response = await apiClient.get<AdminUsersResponse>("/admin/users", {
      params: { page, limit },
    });

    return response.data;
  },

  create: async (data: AdminUserCreateRequest): Promise<User> => {
    const response = await apiClient.post<AdminUserCreateResponse>(
      "/admin/create-user",
      data
    );
    return response.data.user;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/delete-user/${id}`);
  },
};
