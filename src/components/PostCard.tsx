import { Eye, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import type { Post } from "../types/api.types";

function PostCard(data: Post) {
  const navigate = useNavigate();
  const { categories } = useCategory();

  const categoryName = categories.find(cat => cat._id === data.category)?.name || "Sin categoría";

  const handleViewProduct = () => {
    navigate(`/post/${data._id}`);
  };

  return (
    <div
      className="group bg-[#2d2d30] border border-[#3e3e42] rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2"
    >
      {/* Product Image */}
      {data.image ? (
        <div className="relative aspect-square overflow-hidden bg-[#1e1e1e] cursor-pointer" onClick={handleViewProduct}>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="aspect-square bg-[#1e1e1e] flex items-center justify-center">
          <p className="text-gray-500">Sin imagen</p>
        </div>
      )}

      {/* Product Info */}
      <div className="p-5">
        <span className="inline-block px-2 py-1 bg-purple-600/20 text-purple-400 text-xs font-semibold uppercase tracking-wider rounded-md mb-3 border border-purple-500/30">
          {categoryName}
        </span>
        
        <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 cursor-pointer" onClick={handleViewProduct}>
          {data.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 group-hover:text-gray-400 transition-colors duration-300">
          {data.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
            ${data.price.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleViewProduct}
            className="flex-1 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Eye size={16} />
            Ver
          </button>
          <button className="flex-1 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2 cursor-pointer active:scale-95">
            <ShoppingCart size={16} />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
