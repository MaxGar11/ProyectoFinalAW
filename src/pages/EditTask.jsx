import Sidebar from "../components/Sidebar";

export default function EditTask() {
  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-8">Editar tarea</h1>

        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">

          {/* Formulario */}
          <form className="flex flex-col gap-6">

            {/* Título */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Título de la tarea
              </label>
              <input
                type="text"
                defaultValue="Ensayo de historia"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                defaultValue="Escribir 2 cuartillas sobre la cultura Maya."
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            {/* Fecha límite */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fecha límite
              </label>
              <input
                type="date"
                defaultValue="2025-03-10"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Estado
              </label>
              <select
                defaultValue="in-progress"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="pending">Pendiente</option>
                <option value="in-progress">En proceso</option>
                <option value="completed">Completada</option>
              </select>
            </div>

            {/* Botón */}
            <button
              type="button"
              className="mt-4 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition"
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
