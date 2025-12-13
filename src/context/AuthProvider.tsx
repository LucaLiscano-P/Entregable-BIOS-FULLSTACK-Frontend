import { authService } from "../services/auth.service";
import React, { useEffect, useMemo } from "react";
import type {
  EditProfileRequest,
  LoginRequest,
  RegisterRequest,
  User,
  UserChangePasswordRequest,
} from "../types/api.types";
import { AuthContext } from "./AuthContext";

export function AuthProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      authService.saveAuthData(response.user, response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      authService.saveAuthData(response.user, response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const editProfile = async (updatedUser: EditProfileRequest) => {
    try {
      const editProfile = await authService.update(updatedUser);
      setUser(editProfile.user);
    } catch (error) {
      console.error("Error al editar tu Usuario:", error);
      throw error;
    }
  };

 const editPassword = async (data: UserChangePasswordRequest) => {
  try {
    await authService.changePassword(data);
    // acá podés retornar true si querés usarlo en el componente
    return true;
  } catch (error) {
    console.error("Error al editar tu contraseña:", error);
    throw error;
  }
};

  const isAuthenticated = () => !!user && authService.isAuthenticated();

  const value = useMemo(() => {
    return {
      user,
      login,
      isLoading,
      register,
      logout,
      isAuthenticated,
      editProfile,
      editPassword,
    };
  }, [user, isLoading, login, register, logout, isAuthenticated, editProfile, editPassword,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
