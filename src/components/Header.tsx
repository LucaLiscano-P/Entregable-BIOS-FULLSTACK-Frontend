import { Search, Menu, Settings, UserStar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-gray-900 via-gray-900 to-black text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-purple-600 to-purple-400 shadow"></div>
            <h1 className="text-2xl font-bold tracking-tight">TechHub Store</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium transition-all duration-300 hover:text-purple-300 hover:scale-105 relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium transition-all duration-300 hover:text-purple-300 hover:scale-105 relative group"
            >
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a
              href="tel:+1234567890"
              className="text-sm font-medium transition-all duration-300 hover:text-purple-300 hover:scale-105 relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center gap-2 bg-white/6 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10 hover:border-purple-400/40 transition-all duration-300 animate-fade-in-delay">
              <Search size={18} className="text-purple-300" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent text-sm outline-none placeholder:text-gray-300 w-48"
              />
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-purple-300">
                    Bienvenido, {user.name || user.email}
                  </span>
                  {(user.rol === 'admin' || user.rol === 'superadmin') && (
                    <Link
                      to="/dashboard"
                      className="px-5 py-2.5 text-sm font-semibold bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <UserStar size={16} />
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/settings"
                    className="px-5 py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Configuración
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-white hover:text-purple-300 transition-all duration-300 hover:scale-105"
                  >
                    Ingresar
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>

            {/* Menu Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden hover:bg-white/10 p-2 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-6 space-y-2 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <a
              href="#"
              className="block px-4 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
            >
              Inicio
            </a>
            <a
              href="#"
              className="block px-4 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
            >
              Productos
            </a>
            <a
              href="#"
              className="block px-4 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
            >
              Ofertas
            </a>
            <a
              href="#"
              className="block px-4 py-2.5 hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
            >
              Contacto
            </a>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20 mt-4">
              <Search size={18} className="text-purple-300" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent text-sm outline-none placeholder:text-gray-300 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-white/10">
              {user ? (
                <>
                  <div className="px-5 py-2.5 text-sm font-medium text-purple-300 text-center">
                    Bienvenido, {user.name || user.email}
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-5 py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    Configuración
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link
                    to="/register"
                    className="w-full px-5 py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}

              {(user?.rol === 'admin' || user?.rol === 'superadmin') && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-5 py-2.5 text-sm font-semibold bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <UserStar size={16} />
                  Panel Admin
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
