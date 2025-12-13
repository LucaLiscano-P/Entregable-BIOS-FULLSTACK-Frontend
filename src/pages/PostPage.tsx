import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useCategory } from "../hooks/useCategory";
import Header from "../components/Header";
import { ArrowLeft, ShoppingCart, Tag } from "lucide-react";
import type { Post } from "../types/api.types";
import Footer from "../components/Footer";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = usePost();
  const { categories, getCategories } = useCategory();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError("ID del producto no encontrado");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const postData = await getPostById(id);
        setPost(postData);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id, getPostById]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-b from-[#1e1e1e] to-[#252526] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Cargando producto...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-b from-[#1e1e1e] to-[#252526] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">
              {error || "Producto no encontrado"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </>
    );
  }

  const categoryName =
    categories.find((cat) => cat._id === post.category)?.name ||
    "Sin categoría";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-linear-to-b from-[#1e1e1e] to-[#252526]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          {/* Volver */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-semibold">Volver</span>
          </button>

          {/* Contenido */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Imagen */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl">
                {post.image ? (
                  <div className="aspect-square rounded-2xl overflow-hidden border border-[#3e3e42] hover:border-purple-500 transition-colors shadow-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-2xl bg-[#2d2d30] border border-[#3e3e42] flex items-center justify-center">
                    <span className="text-gray-500 text-lg">
                      Imagen no disponible
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-7">
              {/* Categoría */}
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-purple-400" />
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/30">
                  {categoryName}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              {/* Precio */}
              <div>
                <p className="text-gray-400 text-sm mb-1">Precio</p>
                <p className="text-5xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  {post.price.toLocaleString("es-UY", {
                    style: "currency",
                    currency: "UYU",
                  })}
                </p>
              </div>

              {/* Descripción */}
              <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Descripción
                </h2>
                <p className="text-gray-400 leading-relaxed text-base whitespace-pre-line">
                  {post.description}
                </p>
              </div>

              {/* CTA */}
              <button
                className="w-full py-4 bg-linear-to-r from-purple-600 to-purple-700
                       hover:from-purple-500 hover:to-purple-600
                       text-white text-lg font-bold rounded-xl
                       transition-all duration-300
                       hover:shadow-xl hover:shadow-purple-500/40
                       active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       flex items-center justify-center gap-3
                       cursor-pointer
                       "
              >
                <ShoppingCart size={24} />
                Agregar al carrito
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PostPage;
