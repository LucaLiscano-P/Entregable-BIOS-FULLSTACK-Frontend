import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { authService } from "../services/auth.service"
import { Toast } from "./Toast"

export function SecurityPanel() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword.length < 6) {
      setToast({ message: "La nueva contraseña debe tener al menos 6 caracteres", type: "error" })
      return
    }

    if (newPassword !== confirmPassword) {
      setToast({ message: "Las contraseñas no coinciden", type: "error" })
      return
    }

    try {
      setIsLoadingPassword(true)
      await authService.changePassword({
        currentPassword,
        newPassword,
      })
      setToast({ message: "Contraseña editada correctamente", type: "success" })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error("Error al cambiar la contraseña:", error)
      setToast({ 
        message: error.message || "Error al cambiar la contraseña. Verifica tu contraseña actual.", 
        type: "error" 
      })
    } finally {
      setIsLoadingPassword(false)
    }
  }

  return (
    <div className="p-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#cccccc] mb-2">Seguridad</h1>
          <p className="text-[#858585]">Administra tu contraseña y seguridad</p>
        </div>

        <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-[#cccccc] mb-4">
            Cambiar Contraseña
          </h3>
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-[#cccccc] mb-1">
                  Contraseña Actual
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    placeholder="Ingresa tu contraseña actual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585] hover:text-[#cccccc] transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-[#cccccc] mb-1">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="Ingresa tu nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585] hover:text-[#cccccc] transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#cccccc] mb-1">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirma tu nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 bg-[#3c3c3c] border border-[#3e3e42] text-[#cccccc] placeholder-[#858585] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585] hover:text-[#cccccc] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button 
                type="submit"
                disabled={isLoadingPassword}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Lock size={18} />
                {isLoadingPassword ? "Actualizando..." : "Actualizar Contraseña"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
