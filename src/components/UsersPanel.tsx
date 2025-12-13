import { useEffect, useState } from "react";
import { Plus, Trash2, Shield } from "lucide-react";
import { PanelHeader } from "./PanelHeader";
import { useAdmin } from "../hooks/useAdmin";
import { Toast } from "./Toast";

export function UsersPanel() {
  const { users, isLoading, pagination, getUsers, createUser, deleteUser } =
    useAdmin();
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRole, setNewRole] = useState<"user" | "admin" | "superadmin">(
    "user"
  );
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const deleteUserHandler = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el usuario "${name}"?`
    );

    if (!confirmed) return;
    try {
      await deleteUser(id);
      setToast({ message: "Usuario eliminado correctamente", type: "success" });
      await getUsers();
    } catch (err: any) {
      setToast({ message: `Error al eliminar el usuario: ${err.response?.data?.error || err.message}`, type: "error" });
      console.error("Error al eliminar categoría:", err);
    }
  };

  const createUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName || !newEmail || !newPassword) {
      setToast({
        message: "Por favor, completa todos los campos.",
        type: "error",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createUser({
        name: newName,
        email: newEmail,
        rol: newRole,
        password: newPassword,
      });

      setNewName("");
      setNewEmail("");
      setNewRole("user");
      setNewPassword("");
      setToast(null);
      await getUsers();
      setToast({ message: "Usuario creado correctamente", type: "success" });
    } catch (err: any) {
      const error = err?.response?.data.error;

      
      setToast({ message: error, type: "error" });
    } finally {
      setIsSubmitting(false);
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
        title="Gestionar Usuarios"
        description="Administra usuarios y sus roles"
      />

      <div className="flex-1 overflow-auto p-6 bg-[#252526]">
        <div className="max-w-4xl mx-auto">
          {/* Añadir Nuevo Usuario */}
          <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
              Nuevo Usuario
            </h3>
            <form onSubmit={createUserHandler}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="userName"
                    placeholder="Nombre del usuario"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="userEmail"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="correo@ejemplo.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="userPassword"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="userPassword"
                    placeholder="Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="userRole"
                    className="block text-sm font-medium text-[#cccccc] mb-1"
                  >
                    Rol
                  </label>
                  <select
                    id="userRole"
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(
                        e.target.value as "user" | "admin" | "superadmin"
                      )
                    }
                    className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  {isSubmitting ? "Creando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Usuarios */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
              Usuarios Registrados
            </h3>
            {users.length === 0 ? (
              <div className="text-center py-8 text-[#858585]">
                No hay usuarios registrados aún
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 flex items-center justify-between hover:border-purple-500 transition-colors shadow-sm"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#cccccc]">
                      {user.name}
                    </h4>
                    <p className="text-sm text-[#858585]">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        user.rol === "admin"
                          ? "bg-purple-600/20 text-purple-400"
                          : user.rol === "user"
                          ? "bg-[#3e3e42] text-[#cccccc]"
                          : user.rol === "superadmin"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : ""
                      }`}
                    >
                      <Shield size={14} />
                      {user.rol === "superadmin" && "Super Admin"}
                      {user.rol === "admin" && "Admin"}
                      {user.rol === "user" && "Usuario"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteUserHandler(user._id, user.name)}
                        className="p-2 hover:bg-red-600/20 rounded-md transition-colors text-[#cccccc] hover:text-red-400"
                        title="Eliminar usuario"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Paginación */}
          {pagination.pages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => getUsers(pagination.page - 1)}
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
                    onClick={() => getUsers(page)}
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
                onClick={() => getUsers(pagination.page + 1)}
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
              Mostrando {users.length} de {pagination.total} usuarios
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
