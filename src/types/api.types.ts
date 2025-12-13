export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  rol: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

export interface EditProfileRequest {
  name?: string;
  email?: string;
}

export interface EditProfileResponse {
  message: string;
  user: User;
}

export interface CategoriesRequest {
  name: string;
}

export interface CategoryResponse {
  message: string;
  data: Category;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  description: string;
  image?: string;
  price: number;
  category: string;
}

export interface CreatePostResponse {
  message: string;
  data: Post;
}

export interface Post {
  _id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface PostsResponse {
  message: string;
  data: {
    posts: Post[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  };
}


export type AdminUserCreateRequest = {
  name: string;
  email: string;
  password: string;
  rol: "user" | "admin" | "superadmin";
};

export type AdminUserCreateResponse = {
  message: string;
  user: User;
};

export interface AdminUsersResponse {
  message: string;
  data: {
    posts: User[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  };
}

export interface UserChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserChangePasswordResponse {
  message: string;
} 