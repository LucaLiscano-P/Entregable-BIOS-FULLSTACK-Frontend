import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

export function useCategory() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory debe usarse dentro de un CategoryProvider");
  }

  return context;
}
