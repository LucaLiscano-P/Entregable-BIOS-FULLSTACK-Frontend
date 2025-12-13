import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost debe usarse dentro de un PostProvider");
  }
  return context;
}