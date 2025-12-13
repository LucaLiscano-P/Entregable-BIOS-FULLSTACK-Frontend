import { LogOut, Eye, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      id: "users",
      label: "Usuarios",
    },
    {
      id: "categories",
      label: "Categorías",
    },
    {
      id: "posts",
      label: "Posts",
    },
  ];

  return (
    <aside className="w-64 bg-[#1e1e1e] border-r border-[#3e3e42] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded flex items-center justify-center ${
            user?.rol === "admin" ? "bg-purple-600" : 
            user?.rol === "superadmin" ? "bg-yellow-500" : "bg-purple-600"
          }`}>
            <span className="text-white font-bold text-sm">{user?.rol === "admin" ? "A" : user?.rol === "superadmin" && "SA"}</span>
          </div>
          <span className="font-semibold text-[#cccccc]">{user?.rol === "admin" && "Admin"} {user?.rol=== "superadmin" && "Super Admin"} Panel</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
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
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#3e3e42]">
        <button
          onClick={() => handleNavigation("/settings")}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-md text-[#cccccc] hover:bg-gray-600/20 hover:text-purple-400 transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Configuracion</span>
        </button>
        <button
          onClick={() => handleNavigation("/")}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-md text-[#cccccc] hover:bg-gray-600/20 hover:text-purple-400 transition-colors"
        >
          <Eye size={18} />
          <span className="text-sm font-medium">Previsualizar página</span>
        </button>
        <button
          onClick={handleLogout}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-md text-[#cccccc] hover:bg-red-600/20 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
