import type {
  CreatePostRequest,
  CreatePostResponse,
  PostsResponse,
} from "../types/api.types";
import { apiClient } from "./api.client";

export const PostService = {
  getAll: async (page = 1, limit = 10, sort?: string): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>("/posts", {
      params: { page, limit, ...(sort && { sort }) },
    });

    return response.data;
  },

  getById: async (id: string): Promise<CreatePostResponse> => {
    const response = await apiClient.get<CreatePostResponse>(`/posts/${id}`);
    return response.data;
  },

  create: async (data: CreatePostRequest) => {
    const response = await apiClient.post<CreatePostResponse>("/posts", data);
    return response.data;
  },

  update: async (id: string, data: CreatePostRequest) => {
    const response = await apiClient.put<CreatePostResponse>(
      `/posts/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
