import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-[#1e1e1e] to-[#0d0d0d] border-t border-[#3e3e42]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Sobre nosotros */}
          <div>
            <h3 className="text-xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
              TechHub Store
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#2d2d30] border border-[#3e3e42] rounded-lg hover:border-purple-500 hover:bg-[#3e3e42] transition-all duration-300 cursor-pointer"
              >
                <Github size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#2d2d30] border border-[#3e3e42] rounded-lg hover:border-purple-500 hover:bg-[#3e3e42] transition-all duration-300 cursor-pointer"
              >
                <Twitter size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#2d2d30] border border-[#3e3e42] rounded-lg hover:border-purple-500 hover:bg-[#3e3e42] transition-all duration-300 cursor-pointer"
              >
                <Linkedin size={18} className="text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-purple-400 mt-1 shrink-0" />
                <a
                  href="mailto:info@biosstore.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                >
                  info@techhubstore.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                Lunes - Viernes: 9:00 - 18:00
              </li>
              <li className="text-gray-400 text-sm">
                Sábado: 10:00 - 14:00
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-[#3e3e42] pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} TechHub Store. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Hecho con <Heart size={14} className="text-purple-500 fill-purple-500" /> por Luca Liscano
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
