import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";

interface SidebarProps {
  setActiveTab?: (tab: string) => void;
}

export function Sidebar({ setActiveTab }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, getCategories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Sincronizar categoría seleccionada con la ruta actual
  useEffect(() => {
    const categoryIdFromUrl = location.pathname.split("/categories/")[1]?.split("/")[0];
    if (categoryIdFromUrl) {
      setSelectedCategory(categoryIdFromUrl);
      setActiveTab?.(categoryIdFromUrl);
    }
  }, [location.pathname, setActiveTab]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab?.(String(categoryId));
    navigate(`/categories/${categoryId}`);
  };

  return (
    <aside className="w-64 bg-[#1e1e1e] border-r border-[#3e3e42] flex flex-col">
      {/* Categorías */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-xs uppercase font-semibold text-gray-500 px-4 py-2 mb-3">
          Categorías
        </h3>
        {categories && categories.length > 0 ? (
          categories.map((category) => {
            const isCategoryActive = selectedCategory === String(category._id);
            return (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(String(category._id))}
                className={`w-full text-left px-4 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer ${
                  isCategoryActive
                    ? "bg-linear-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                    : "text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white"
                }`}
              >
                {category.name}
              </button>
            );
          })
        ) : (
          <p className="text-xs text-gray-500 px-4 py-2">
            Sin categorías disponibles
          </p>
        )}
      </nav>
    </aside>
  );
}
