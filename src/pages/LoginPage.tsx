import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
        setIsLoading(true);
        await login({ email, password });
        navigate("/");
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            setError(error.response?.data.message || "Error en la solicitud de inicio de sesión.");
        } else {
            setError("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
        }
    } finally {
        setIsLoading(false);
    }
}



  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-950 to-black flex flex-col justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">
            Bienvenido, por favor ingresa tus credenciales.
          </p>
        </div>
            {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="mt-6">
            <button 
              className="w-full bg-linear-to-r from-gray-900 via-purple-950 to-black text-white font-semibold py-3 rounded-lg border-2 border-purple-600/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Iniciando Sesión..." : "Ingresar"}
            </button>
            <Link 
              to="/" 
              className="mt-4 block text-center text-sm text-gray-700 hover:text-gray-900 font-medium py-2.5 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              Volver a Inicio
            </Link>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta? <Link to="/register" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
