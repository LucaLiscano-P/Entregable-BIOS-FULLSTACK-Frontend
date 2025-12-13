import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { uploadToCloudinary } from "../utils/CloudinaryImage";
import { useCategory } from "../hooks/useCategory";
import { usePost } from "../hooks/usePost";

export function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { categories, getCategories} = useCategory();
  const { updatePost, getPostById } = usePost();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        try {
          const post = await getPostById(id);
          setTitle(post.title);
          setCategory(post.category);
          setDescription(post.description);
          setPrice(post.price);
          if (post.image) {
            setImagePreview(post.image);
          }
        } catch (err) {
          setError("No se pudo cargar el post.");
          console.error(err);
        } finally {
          setPageLoading(false);
        }
      }
    };
    loadPost();
  }, [id, getPostById]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        setError("Por favor, selecciona un archivo de imagen válido.");
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no debe superar los 5MB.");
        return;
      }

      setImageFile(file);
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !category || !description || price === "") { // price puede ser 0
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!id) {
      setError("ID del post no encontrado.");
      return;
    }

    try {
      setIsLoading(true);

      // 1) Subir la imagen SOLO si existe y es un archivo nuevo
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // 2) Enviar al backend con la URL final
      const payload: any = {
        title,
        category,
        description,
        price,
      };

      // Solo incluir image si existe una nueva
      if (imageUrl) {
        payload.image = imageUrl;
      } else if (imagePreview && !imageFile) {
        // Mantener la imagen anterior si no hay archivo nuevo
        payload.image = imagePreview;
      }

      await updatePost(id, payload);

      console.log("Payload final:", payload);
 
      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Error al actualizar el post. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#252526] flex flex-col">
      {/* Header */}
      <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver al Dashboard</span>
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-[#cccccc] mb-2">
              Editar Post
            </h1>
            <p className="text-[#858585] mb-6">
              Modifica los detalles del post.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg">
                {error}
              </div>
            )}

            {pageLoading ? (
              <div className="text-center py-8 text-[#858585]">
                Cargando datos del post...
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Título <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Título del post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Categoría <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    disabled={isLoading}
                  >
                    <option value="" className="bg-[#3c3c3c] text-[#858585]">
                      Selecciona una categoría
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id} className="bg-[#3c3c3c] text-[#cccccc]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Precio <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Precio del producto"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    disabled={isLoading}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Descripción <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Descripción del post"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition resize-none"
                    rows={5}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Imagen (Opcional)
                  </label>

                  {!imagePreview ? (
                    <div className="relative">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                        className="hidden"
                        disabled={isLoading}
                      />
                      <label
                        htmlFor="image"
                        className="w-full flex items-center justify-center gap-2 px-4 py-8 bg-[#3c3c3c] border-2 border-dashed border-[#3e3e42] text-[#858585] rounded-lg hover:border-purple-600 hover:text-purple-400 transition cursor-pointer"
                      >
                        <Upload size={24} />
                        <span>Haz clic para subir una imagen</span>
                      </label>
                      <p className="text-xs text-[#858585] mt-1">
                        Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg border border-[#3e3e42]"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors"
                        disabled={isLoading}
                      >
                        <X size={18} />
                      </button>
                      <p className="text-sm text-[#cccccc] mt-2">
                        {imageFile?.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-[#cccccc] font-semibold py-3 rounded-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
