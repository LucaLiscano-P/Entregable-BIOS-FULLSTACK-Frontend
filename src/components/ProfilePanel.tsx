import { useState } from "react"
import { Edit2, CircleX, User } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { Toast } from "./Toast"

export function ProfilePanel() {
  const { user, editProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState(user?.name || "")
  const [newEmail, setNewEmail] = useState(user?.email || "")
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const handleEditProfile = async () => {
    try {
      setIsLoadingProfile(true)
      await editProfile?.({ name: newName, email: newEmail })
      setEditing(false)
      setToast({ message: "Usuario editado correctamente", type: "success" })
    } catch (error) {
      console.error("Error al guardar el perfil:", error)
      setToast({ message: "Error al actualizar el perfil. Por favor, intenta de nuevo.", type: "error" })
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const handleCancelEdit = () => {
    setNewName(user?.name || "")
    setNewEmail(user?.email || "")
    setEditing(false)
  }

  return (
    <div className="p-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#cccccc] mb-2">Perfil</h1>
          <p className="text-[#858585]">Gestiona tu información personal</p>
        </div>

        <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#cccccc]">
              Información del Usuario
            </h3>
            {!editing ? (
              <button 
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
              >
                <Edit2 size={18} />
                <span>Editar</span>
              </button>
            ) : (
              <button 
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                <CircleX size={18} />
                <span>Cancelar</span>
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#cccccc] mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={editing ? newName : (user?.name || "")}
                onChange={(e) => setNewName(e.target.value)}
                readOnly={!editing}
                className={`w-full px-4 py-2.5 border border-[#3e3e42] text-[#cccccc] rounded-lg ${
                  editing 
                    ? "bg-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-purple-600" 
                    : "bg-[#252526] cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#cccccc] mb-1">
                Email
              </label>
              <input
                type="email"
                value={editing ? newEmail : (user?.email || "")}
                onChange={(e) => setNewEmail(e.target.value)}
                readOnly={!editing}
                className={`w-full px-4 py-2.5 border border-[#3e3e42] text-[#cccccc] rounded-lg ${
                  editing 
                    ? "bg-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-purple-600" 
                    : "bg-[#252526] cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#cccccc] mb-1">
                Rol
              </label>
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                user?.rol === "admin" || user?.rol === "superadmin"
                  ? "bg-purple-600/20 text-purple-400" 
                  : "bg-[#3e3e42] text-[#cccccc]"
              }`}>
                {user?.rol}
              </span>
            </div>
          </div>
          {editing && (
            <div className="mt-6">
              <button 
                onClick={handleEditProfile}
                disabled={isLoadingProfile}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <User size={18} />
                {isLoadingProfile ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
