import { useEffect, useState } from "react";
import { useCategory } from "../hooks/useCategory";
import Header from "../components/Header";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

function CategoryPage() {
  const { categories, getCategories } = useCategory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(false);
        await getCategories();
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-gray-400">
            Cargando categorías...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen from-[#1e1e1e] to-[#252526]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl text-purple-500 font-bold bg-clip-text mb-4">
              Categorías de Productos
            </h1>
            <p className="text-gray-400 text-lg">
              Explora nuestras categorías disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <button
              onClick={() => window.location.href = `/categories/${category._id}`}
                key={category._id}
                className="group relative bg-linear-to-br from-[#2d2d30] to-[#252526] border border-[#3e3e42] rounded-xl p-8 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-purple-600/20 transition-all duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {category.name}
                    </h2>
                    <ChevronRight
                      size={24}
                      className="text-purple-400 transform group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>

                  {/* Decorative bar */}
                  <div className="h-1 w-12 bg-linear-to-r from-purple-500 to-transparent rounded-full group-hover:w-16 transition-all duration-300"></div>
                </div>
              </button>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No hay categorías disponibles
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
