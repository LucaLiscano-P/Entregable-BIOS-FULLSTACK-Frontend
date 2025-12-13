import { createContext } from "react";
import type { CategoriesRequest, Category } from "../types/api.types";

interface CategoryContextType {
  categories: Category[];
  isLoading: boolean;
  categoryCreate: (data: CategoriesRequest) => Promise<void>;
  categoryEdit: (id: string, data: CategoriesRequest) => Promise<void>;
  categoryDelete: (id: string) => Promise<void>;
  getCategories: () => Promise<void>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);