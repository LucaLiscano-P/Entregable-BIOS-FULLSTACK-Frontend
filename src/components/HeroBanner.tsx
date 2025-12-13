import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section className="bg-linear-to-br from-gray-900 via-purple-950 to-black text-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Tecnología de Última Generación
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Descubre las mejores computadoras, componentes y accesorios tech.
              Garantía oficial y envío rápido.
            </p>
            <Link
              to="/categories"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 transition shadow-sm"
            >
              Explorar Catálogo
            </Link>
          </div>
          <div className="bg-white/3 rounded-lg h-64 md:h-80 flex items-center justify-center border border-white/6">
            <div className="text-center">
              <div className="mb-2">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/048/412/770/small/modern-gaming-pc-isolated-on-transparent-free-png.png"
                  alt="PC"
                  className="mx-auto max-w-[220px] md:max-w-[320px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
