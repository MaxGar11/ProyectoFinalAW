import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold"
      : "hover:text-blue-600";

  return (
    <aside className="w-64 h-screen p-6 bg-white border-r shadow-sm">
      <h2 className="text-2xl font-bold text-blue-700 mb-10">TaskFlow</h2>

      <nav className="flex flex-col gap-5 font-semibold text-gray-700">
        <Link to="/feed" className={isActive("/feed")}>
          Feed público
        </Link>

        <Link to="/mis-tareas" className={isActive("/mis-tareas")}>
          Mis tareas
        </Link>

        <Link to="/crear" className={isActive("/crear")}>
          Crear tarea
        </Link>

        <Link to="/perfil" className={isActive("/perfil")}>
          Mi perfil
        </Link>
      </nav>
    </aside>
  );
}
