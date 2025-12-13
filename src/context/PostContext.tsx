import { createContext } from "react";
import type {CreatePostRequest, Post} from "../types/api.types";


interface PostContextType {
    posts : Post[]
    isLoading: boolean;
    createPost: (data: CreatePostRequest) => Promise<void>;
    getAllPosts: (page?: number) => Promise<void>;
    getPostById: (id: string) => Promise<Post>;
    deletePost: (id: string) => Promise<void>;
    updatePost: (id: string, data: CreatePostRequest) => Promise<void>;
    pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}


export const PostContext = createContext<PostContextType | undefined>(undefined);

