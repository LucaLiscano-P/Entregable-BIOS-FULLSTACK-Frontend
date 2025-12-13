import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe usarse dentro de un AdminProvider");
  }
  return context;
}