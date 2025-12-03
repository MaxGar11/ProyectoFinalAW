import { FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onDelete, onToggleComplete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
      {/* Título + Estado */}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>

        <span
          className={`px-3 py-1 text-sm rounded-full ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status === "completed" ? "Completada" : "Pendiente"}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mt-2">{task.description}</p>

      {/* Fecha */}
      <p className="text-gray-400 text-sm mt-1">
        {task.date ? `Creada el ${task.date}` : ""}
      </p>

      {/* Botones */}
      <div className="flex gap-3 mt-4">
        {/* Completar */}
        <button
          onClick={onToggleComplete}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition"
        >
          <FaCheckCircle />
          <span>{task.completed ? "Desmarcar" : "Completar"}</span>
        </button>

        {/* Editar → abre la vista EditTask */}
        <button
          onClick={() => navigate(`/edit/${task.id}`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
        >
          <FaEdit />
          <span>Editar</span>
        </button>

        {/* Eliminar */}
        <button
          onClick={onDelete}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
        >
          <FaTrash />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
}
