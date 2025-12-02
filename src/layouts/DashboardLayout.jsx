import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FeedUserCard from "../components/FeedUserCard";
import { HiMenu, HiX } from "react-icons/hi";

export default function DashboardLayout({ children, showRight = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen relative">

      {/* Botón hamburguesa (móvil) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar (izquierda) */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-40
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Sidebar />
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="flex-1 p-6 md:p-10">{children}</div>

      {/* Botón de mostrar panel derecho (solo si showRight = true) */}
      {showRight && (
        <button
          className="md:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow"
          onClick={() => setRightOpen(!rightOpen)}
        >
          {rightOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      )}

      {/* Panel derecho (FeedUserCard) */}
      {showRight && (
        <div
          className={`
            fixed md:static top-0 right-0 h-full w-80 bg-white shadow-lg z-40
            transform transition-transform duration-300
            ${rightOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          <div className="p-6">
            <FeedUserCard />
          </div>
        </div>
      )}
    </div>
  );
}
