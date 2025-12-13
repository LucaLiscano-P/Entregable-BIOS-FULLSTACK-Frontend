import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit2, CircleX, CircleCheckBig } from "lucide-react";
import { PanelHeader } from "./PanelHeader";
import { useCategory } from "../hooks/useCategory";
import { Toast } from "./Toast";

export function CategoriesPanel() {
  const {
    categories,
    isLoading,
    categoryCreate,
    categoryDelete,
    categoryEdit,
  } = useCategory();
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toEdit, setToEdit] = useState<string | null>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setToEdit(null);
      }
    };

    if (toEdit) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory) {
      setToast({ message: "Por favor, ingresa un nombre para la categoría.", type: "error" });
      return;
    }

    try {
      setIsSubmitting(true);
      await categoryCreate({ name: newCategory });
      setToast({ message: "Categoría creada correctamente", type: "success" });
      setNewCategory("");
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      const message = err?.response?.data?.message;
      
      let errorMessage = "Ocurrió un error inesperado.";
      
      if (Array.isArray(errors) && errors.length > 0) {
        errorMessage = errors.map((e: any) => e.msg || e.message || e).join(", ");
      } else if (message) {
        errorMessage = message;
      }

      setToast({ message: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar la categoría "${name}"?`
    );

    if (!confirmed) return;
    try {
      await categoryDelete(id);
      setToast({ message: "Categoría eliminada correctamente", type: "success" });
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
    }
  };

  const editCategory = async (id: string, newName: string) => {
    try {
      await categoryEdit(id, { name: newName });
      setToast({ message: "Categoría editada correctamente", type: "success" });
    } catch (err: any) {
      const error = err?.response?.data?.error;
      const messagesError = err?.response?.data?.errors;
      
      let errorMessage = "Ocurrió un error inesperado.";

      if (Array.isArray(messagesError) && messagesError.length > 0) {
        errorMessage = messagesError.map((e: any) => e.msg || e.message || e).join(", ");
      } else if (error) {
        errorMessage = error;
      }
      
    
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setToEdit(null);
    }
  };

  // Las categorías se muestran aquí:
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
        title="Gestionar Categorías"
        description="Añade, edita o elimina categorías"
      />

      <div className="flex-1 overflow-auto p-6 bg-[#252526]">
        <div className="max-w-4xl mx-auto">
          {/* Añadir Nueva Categoría */}
          <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
              Nueva Categoría
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Nombre de la categoría
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    placeholder="Nombre de la categoría"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                  {isSubmitting ? "Añadiendo..." : "Añadir Categoría"}
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Categorías */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
              Categorías Existentes
            </h3>

            {isLoading && categories.length === 0 ? (
              <div className="text-center py-8 text-[#858585]">
                Cargando categorías...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-[#858585]">
                No hay categorías creadas.
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category._id}
                  ref={toEdit === category._id ? editRef : null}
                  className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 flex items-center justify-between hover:border-purple-500 transition-colors shadow-sm"
                >
                  <div className="flex-1">
                    {toEdit === category._id ? (
                      <input
                        type="text"
                        defaultValue={category.name}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-1/2 px-3 py-1.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                      />
                    ) : (
                      <h4 className="font-semibold text-[#cccccc]">
                        {category.name}
                      </h4>
                    )}
                    <p className="text-sm text-[#858585] mt-1">
                      Creada:{" "}
                      {new Date(category.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {toEdit === category._id ? (
                      <button
                        onClick={() => editCategory(category._id, newName)}
                        className="p-2 hover:bg-green-600/20 rounded-md transition-colors text-green-400 hover:text-green-300"
                      >
                        <CircleCheckBig size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setToEdit(category._id);
                          setNewName(category.name);
                        }}
                        className="p-2 hover:bg-[#3e3e42] rounded-md transition-colors text-[#cccccc] hover:text-white"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}

                    {toEdit === category._id ? (
                      <button
                        onClick={() => setToEdit(null)}
                        className="p-2 hover:bg-red-600/20 rounded-md transition-colors text-red-400 hover:text-red-300"
                      >
                        <CircleX size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          deleteCategory(category._id, category.name)
                        }
                        className="p-2 hover:bg-red-600/20 rounded-md transition-colors text-[#cccccc] hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
