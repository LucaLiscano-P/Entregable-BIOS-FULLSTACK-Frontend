import type { CategoriesRequest, Category, CategoryResponse } from "../types/api.types";
import { apiClient } from "./api.client";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<{ message: string; data: Category[] }>("/categories");
    return response.data.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<{ message: string; data: Category }>(`/categories/${id}`);
    return response.data.data;
  },

  create: async (data: CategoriesRequest): Promise<Category> => {
    const response = await apiClient.post<CategoryResponse>("/categories", data);
    return response.data.data;
  },

  update: async (id: string, data: CategoriesRequest): Promise<Category> => {
    const response = await apiClient.put<CategoryResponse>(`/categories/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
