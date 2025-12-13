import { createContext } from "react";
import type { EditProfileRequest, LoginRequest, RegisterRequest, User, UserChangePasswordRequest } from "../types/api.types";


interface AuthContextType {
    user : User | null;
    isLoading: boolean;
    login: (data:LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    editProfile?: (updatedUser: EditProfileRequest) => Promise<void>;
    editPassword?: (data: UserChangePasswordRequest) => Promise<boolean>;
    isAuthenticated: () => boolean;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

