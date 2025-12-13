import React, { useCallback, useState } from "react";
import type { CreatePostRequest, Post } from "../types/api.types";
import { PostService } from "../services/post.service";
import { PostContext } from "./PostContext";

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    total: 0, // Total de usuarios
    page: 1, // Página actual
    pages: 1, // Total de páginas
    limit: 10, // Usuarios por página
  });

  const getAllPosts = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const data = await PostService.getAll(page);
      console.log(data);
      setPosts(data.data.posts);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error("Error al obtener Posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPostById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const data = await PostService.getById(id);
      return data.data;
    } catch (error) {
      console.error("Error al obtener el Post:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPost = useCallback(async (data: CreatePostRequest) => {
    try {
      const response = await PostService.create(data);
      setPosts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error al crear Post:", error);
      throw error;
    }
  }, []);

  const updatePost = useCallback(async (id: string, data: CreatePostRequest) => {
    try {
      const response = await PostService.update(id, data);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === Number(id) ? response.data : post))
      );
    } catch (error) {
      console.error("Error al actualizar el Post:", error);
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      await PostService.delete(id);
      // Recargar la página actual después de eliminar
      const data = await PostService.getAll(pagination.page);
      setPosts(data.data.posts);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error("Error al eliminar el Post:", error);
      throw error;
    }
  }, [pagination.page]);

  

  const value = {
    posts,
    isLoading,
    createPost,
    getAllPosts,
    getPostById,
    pagination,
    deletePost,
    updatePost
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
