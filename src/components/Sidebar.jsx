import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen p-6 bg-white border-r shadow-sm">
      <h2 className="text-2xl font-bold text-blue-700 mb-10">TaskFlow</h2>

      <nav className="flex flex-col gap-5 font-semibold text-gray-700">
        <Link to="/feed" className="hover:text-blue-600">Feed público</Link>
        <Link to="/mis-tareas" className="text-blue-600 font-bold">
          Mis tareas
        </Link>
        <Link to="/crear" className="hover:text-blue-600">Crear tarea</Link>
        <Link to="/perfil" className="hover:text-blue-600">Mi perfil</Link>
      </nav>
    </aside>
  );
}
