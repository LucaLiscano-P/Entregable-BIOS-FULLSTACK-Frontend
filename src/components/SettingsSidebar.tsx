import { LogOut, User, Lock, MoveLeft } from "lucide-react"

interface SettingsSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
  onGoBack: () => void
}

export function SettingsSidebar({ activeTab, setActiveTab, onLogout, onGoBack }: SettingsSidebarProps) {
  const menuItems = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Lock },
  ]

  return (
    <aside className="w-64 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
      <div className="p-6 border-b border-[#3e3e42]">
        <h2 className="font-semibold text-[#cccccc] text-lg">Configuración</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-[#37373d] text-white border-l-2 border-purple-500"
                  : "text-[#cccccc] hover:bg-[#2a2d2e]"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#3e3e42]">
        <button
          onClick={onGoBack}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-md text-[#cccccc] hover:bg-gray-600/20 hover:text-gray-400 transition-colors"
        >
          <MoveLeft size={18} />
          <span className="text-sm font-medium">Volver</span>
        </button>
        <button
          onClick={onLogout}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-md text-[#cccccc] hover:bg-red-600/20 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}
