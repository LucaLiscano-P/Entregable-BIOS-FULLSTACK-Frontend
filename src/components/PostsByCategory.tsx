
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostService } from "../services/post.service";
import { useCategory } from "../hooks/useCategory";
import PostCard from "./PostCard";
import { Frown } from "lucide-react";
import type { Post } from "../types/api.types";

function PostsByCategory() {
  const { id } = useParams<{ id: string }>();
  const { categories } = useCategory();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Obtener la categoría
  const category = categories.find(cat => String(cat._id) === id);

  // Cargar posts de la categoría
  useEffect(() => {
    const loadPostsByCategory = async () => {
      if (!id) {
        setError("ID de categoría no proporcionado");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await PostService.getAll(currentPage, 12);
        
        // Filtrar posts por categoría
        const filteredPosts = response.data.posts.filter(
          post => String(post.category) === id
        );
        
        setPosts(filteredPosts);
        setTotalPages(response.data.pagination.pages);
      } catch (err) {
        console.error("Error al cargar posts:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setIsLoading(false);
      }
    };

    loadPostsByCategory();
  }, [id, currentPage]);

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#252526] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#252526] p-6 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {category?.name || "Categoría"}
          </h2>
          <p className="text-gray-400">
            {posts.length} producto{posts.length !== 1 ? "s" : ""} disponible{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid de productos */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post._id} {...post} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#2d2d30] border border-[#3e3e42] text-[#cccccc] rounded-lg hover:bg-[#3e3e42] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      currentPage === page
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-[#2d2d30] border border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#2d2d30] border border-[#3e3e42] text-[#cccccc] rounded-lg hover:bg-[#3e3e42] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg mb-4">{error}</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              <Frown className="mx-auto mb-4 text-gray-400" size={48} />
              No hay productos disponibles en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsByCategory;