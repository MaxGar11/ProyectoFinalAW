export default function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-100 hover:shadow-lg transition">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800 text-lg">
          {task.title}
        </span>

        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : task.status === "in-progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {task.status === "completed"
            ? "Completada"
            : task.status === "in-progress"
            ? "En proceso"
            : "Pendiente"}
        </span>
      </div>

      {/* Fecha */}
      <p className="text-sm text-gray-500 mt-1">
        Fecha límite: {task.date}
      </p>

      {/* Descripción */}
      <p className="text-gray-700 mt-3 line-clamp-3">{task.description}</p>

      {/* Acciones */}
      <div className="flex justify-between mt-4">
        <button className="text-blue-600 font-semibold hover:underline">
          Editar
        </button>

        <button className="text-red-600 font-semibold hover:underline">
          Eliminar
        </button>
      </div>
    </div>
  );
}
