import { useEffect, useState } from "react";
import { PostService } from "../services/post.service";
import type { Post } from "../types/api.types";
import PostCard from "./PostCard";

function NewBannerProducts() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setIsLoading(true);
        const response = await PostService.getAll(1, 5, "desc");
        setLatestPosts(response.data.posts);
      } catch (error) {
        console.error("Error al cargar los últimos productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Nuevos Ingresos
          </h2>
          <div className="text-center text-gray-400">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-linear-to-b from-[#1e1e1e] to-[#252526]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl text-purple-500 font-bold bg-clip-text mb-4">
            Nuevos Ingresos
          </h2>
          <p className="text-gray-400 text-lg">
            Descubre nuestros últimos productos agregados
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {latestPosts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>

        {latestPosts.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">No hay productos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewBannerProducts;