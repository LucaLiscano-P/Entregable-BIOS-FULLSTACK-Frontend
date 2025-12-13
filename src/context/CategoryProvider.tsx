import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CategoryContext } from "./CategoryContext";
import type { CategoriesRequest, Category } from "../types/api.types";
import { categoryService } from "../services/category.service";



export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Obtener categorías al montar el componente
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const categoryCreate = useCallback(async (data: CategoriesRequest) => {
    try {
      const newCategory = await categoryService.create(data);
      setCategories(prev => [...prev, newCategory]);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      throw error;
    }
  }, []);

  const categoryEdit = useCallback(async (id: string, data: CategoriesRequest) => {
    try {
      const updatedCategory = await categoryService.update(id, data);
      setCategories(prev => prev.map(cat => 
        cat._id === id ? updatedCategory : cat
      ));
    } catch (error) {
      console.error("Error al editar categoría:", error);
      throw error;
    }
  }, []);

  const categoryDelete = useCallback(async (id: string) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(cat => cat._id !== id));
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      throw error;
    }
  }, []);

  const value = useMemo(() => {
    return {
      categories,
      isLoading,
      categoryCreate,
      categoryEdit,
      categoryDelete,
      getCategories,
    };
  }, [categories, isLoading, categoryCreate, categoryEdit, categoryDelete, getCategories]);

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}
