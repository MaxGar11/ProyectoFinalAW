import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTasks } from "../hooks/useTasks";

export default function CreateTask() {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- Si existe, estamos editando
  const { tasks, createTask, updateTask } = useTasks();

  // Buscar la tarea a editar
  const taskToEdit = tasks.find((t) => t.id === id);

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");
  const [privacy, setPrivacy] = useState("private");

  // Si está en edición, rellenar
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDeadline(taskToEdit.deadline || "");
      setStatus(taskToEdit.status || "pending");
      setPrivacy(taskToEdit.isPublic ? "public" : "private");
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskToEdit) {
      // 🔵 EDITAR TAREA
      await updateTask(id, {
        title,
        description,
        deadline,
        status,
        isPublic: privacy === "public",
      });
    } else {
      // 🟢 CREAR TAREA
      await createTask({
        title,
        description,
        deadline,
        status,
        isPublic: privacy === "public",
        likes: [],
      });
    }

    navigate("/mis-tareas");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">
          {taskToEdit ? "Editar tarea" : "Crear nueva tarea"}
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {/* Título */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Título de la tarea
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Ensayo de historia"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe los detalles de la tarea..."
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
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Estado inicial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="pending">Pendiente</option>
                <option value="in-progress">En proceso</option>
                <option value="completed">Completada</option>
              </select>
            </div>

            {/* Privacidad */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Privacidad
              </label>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="private">Privada (solo tú)</option>
                <option value="public">Pública (visible en el feed)</option>
              </select>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              {taskToEdit ? "Guardar cambios" : "Guardar tarea"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
