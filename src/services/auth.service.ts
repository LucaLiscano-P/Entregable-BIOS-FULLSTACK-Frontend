import type {
  EditProfileRequest,
  EditProfileResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserChangePasswordRequest,
  UserChangePasswordResponse,
} from "../types/api.types";
import { apiClient } from "./api.client";

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      data
    ); // Realiza la solicitud POST a /auth/register con los datos proporcionados
    return response.data;
  },
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data); // Realiza la solicitud POST a /auth/login con los datos proporcionados
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("user"); // Eliminar el usuario del almacenamiento local
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
  },

  update: async (data: EditProfileRequest) => {
  try {
    const response = await apiClient.put<EditProfileResponse>("/auth/edit-profile", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error actualizando el perfil");
  }
},

  changePassword: async (data: UserChangePasswordRequest) => {
    try {
      const response = await apiClient.put<UserChangePasswordResponse>("/auth/edit-password", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error cambiando la contraseña");
    }
  },

  saveAuthData: (user: LoginResponse["user"], token: string) => {
    localStorage.setItem("user", JSON.stringify(user)); // Guardar el usuario como un string JSON
    localStorage.setItem("token", token); // Guardar el token directamente
  },

  getCurrentUser: () => {
    const userString = localStorage.getItem("user"); // Obtener el string JSON del usuario almacenado
    if (!userString) return null; // Si no hay usuario almacenado, retornar null
    try {
        return JSON.parse(userString); // Parsear el string JSON para obtener el objeto usuario
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
    if (!token) return false; // Si no hay token, no está autenticado

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload del token
      const expiration = payload.exp * 1000; // Convertir a milisegundos
      return Date.now() < expiration; // true si el token no ha expirado
    } catch (error) {
      return false;
    }
  },
};
