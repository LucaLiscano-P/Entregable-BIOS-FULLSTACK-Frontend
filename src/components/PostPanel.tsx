import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PanelHeader } from "./PanelHeader";
import { usePost } from "../hooks/usePost";
import { useCategory } from "../hooks/useCategory";
import { Toast } from "./Toast";

export function PostsPanel() {
  const navigate = useNavigate();

  const { getAllPosts, pagination, isLoading, posts, deletePost } = usePost();
  const { categories, getCategories } = useCategory();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    getAllPosts();
    getCategories();
  }, [getAllPosts, getCategories]);

  const deletePostHandler = async (id: string, post: string) => {
    // Lógica para eliminar el post

    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el Post "${post}"?`
    );

    if (!confirmed) return;

    try {
      await deletePost(id);
      setToast({
        message: `Post "${post}" fue eliminado correctamente.`,
        type: "success",
      });
      await getAllPosts();
    } catch (error: any) {
      setToast({
        message: error?.message || "Error al eliminar el Post.",
        type: "error",
      });
      console.error("Error al eliminar el Post:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <PanelHeader
        title="Gestionar Posts"
        description="Crea, edita o elimina posts"
      />

      <div className="flex-1 overflow-auto p-6 bg-[#252526]">
        <div className="max-w-4xl mx-auto">
          {/* Create Post Button */}
          <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
              Crear Nuevo Post
            </h3>
            <p className="text-sm text-[#858585] mb-4">
              Dirígete a la página de creación para añadir un nuevo post con
              todos los detalles.
            </p>
            <button
              onClick={() => navigate("/dashboard/create-post")}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Ir a Crear Post
            </button>
          </div>

          {/* Posts List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
              Posts Existentes
            </h3>
            {posts.length === 0 ? (
              <div className="text-center py-8 text-[#858585]">
                No hay posts creados aún
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 flex items-center justify-between hover:border-purple-500 transition-colors shadow-sm"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#cccccc]">
                      {post.title}
                    </h4>
                    <p className="text-sm text-[#858585] mt-1 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded">
                        Categoria:{" "}
                        {post.category
                          ? categories.find((cat) => cat._id === post.category)
                              ?.name ?? "Desconocida"
                          : "Sin categoría"}
                      </span>
                      <span className="text-[#cccccc]">
                        Precio: ${post.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => navigate(`/dashboard/edit-post/${post._id}`)}
                      className="p-2 hover:bg-[#3e3e42] rounded-md transition-colors text-[#cccccc] hover:text-white">
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="p-2 hover:bg-red-600/20 rounded-md transition-colors text-[#cccccc] hover:text-red-400"
                      onClick={() => deletePostHandler(String(post._id), post.title)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Paginación */}
          {pagination.pages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => getAllPosts(pagination.page - 1)}
                disabled={pagination.page === 1 || isLoading}
                className="px-4 py-2 bg-[#2d2d30] border border-[#3e3e42] text-[#cccccc] rounded-lg hover:bg-[#3e3e42] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Anterior
              </button>

              {/* Botones de página */}
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => getAllPosts(page)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg transition ${
                      pagination.page === page
                        ? "bg-purple-600 text-white"
                        : "bg-[#2d2d30] border border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => getAllPosts(pagination.page + 1)}
                disabled={pagination.page === pagination.pages || isLoading}
                className="px-4 py-2 bg-[#2d2d30] border border-[#3e3e42] text-[#cccccc] rounded-lg hover:bg-[#3e3e42] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Siguiente
              </button>
            </div>
          )}

          {/* Información de paginación */}
          {pagination.total > 0 && (
            <div className="mt-4 text-center text-sm text-[#858585]">
              Mostrando {posts.length} de {pagination.total} posts
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
