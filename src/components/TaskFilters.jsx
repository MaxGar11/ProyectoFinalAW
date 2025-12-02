export default function TaskFilters({ filter, setFilter, search, setSearch }) {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* Filtros */}
      <div className="flex gap-3">
        {["all", "in-progress", "completed"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-xl font-semibold border ${
              filter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? "Todas"
              : f === "in-progress"
              ? "En proceso"
              : "Completadas"}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 w-64 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
      />
    </div>
  );
}
