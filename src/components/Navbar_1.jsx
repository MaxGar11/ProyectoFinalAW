export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="text-2xl font-bold text-blue-600">
          TaskHub
        </div>

        <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Inicio</li>
          <li className="hover:text-blue-600 cursor-pointer">Contacto</li>
        </ul>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg md:block hidden hover:bg-blue-700">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}
