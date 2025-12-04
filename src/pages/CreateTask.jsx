import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTasks } from "../hooks/useTasks";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function CreateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, createTask, updateTask } = useTasks();

  const taskToEdit = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");
  const [privacy, setPrivacy] = useState("private");

  // Archivo (imagen, pdf, doc, etc.)
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDeadline(taskToEdit.deadline || "");
      setStatus(taskToEdit.status || "pending");
      setPrivacy(taskToEdit.isPublic ? "public" : "private");

      if (taskToEdit.attachment) {
        setPreview(taskToEdit.attachment);
      }
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = taskToEdit?.attachment || null;

    if (file) {
      try {
        fileUrl = await uploadToCloudinary(file);
      } catch (err) {
        console.error("Error subiendo archivo:", err);
        alert("No se pudo subir el archivo.");
      }
    }

    const taskData = {
      title,
      description,
      deadline,
      status,
      isPublic: privacy === "public",
      attachment: fileUrl,
      attachmentType: file ? file.type : taskToEdit?.attachmentType || null,
      likes: taskToEdit ? undefined : [],
    };

    if (taskToEdit) {
      await updateTask(id, taskData);
    } else {
      await createTask(taskData);
    }

    navigate("/mis-tareas");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

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
                className="w-full p-3 border rounded-xl shadow-sm"
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
                className="w-full p-3 border rounded-xl shadow-sm"
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
                className="w-full p-3 border rounded-xl shadow-sm"
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
                className="w-full p-3 border rounded-xl shadow-sm"
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
                className="w-full p-3 border rounded-xl shadow-sm"
              >
                <option value="private">Privada</option>
                <option value="public">Pública</option>
              </select>
            </div>

            {/* Archivo adjunto */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Archivo adjunto (opcional)
              </label>

              <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold cursor-pointer hover:bg-blue-700 transition">
                Seleccionar archivo
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files[0];
                    setFile(selected);

                    if (!selected) {
                      setPreview(null);
                      return;
                    }

                    if (selected.type.startsWith("image/")) {
                      setPreview(URL.createObjectURL(selected));
                    } else {
                      setPreview(selected.name); // solo mostramos nombre
                    }
                  }}
                />
              </label>

              {/* Preview */}
              {preview && (
                <div className="mt-3">
                  {typeof preview === "string" && preview.startsWith("http") ? (
                    <a
                      href={preview}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Archivo adjunto actual
                    </a>
                  ) : file?.type?.startsWith("image/") ? (
                    <img
                      src={preview}
                      className="w-48 rounded-xl shadow border"
                      alt="preview"
                    />
                  ) : (
                    <p className="text-gray-700 mt-2">
                      Archivo seleccionado: {file?.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              {taskToEdit ? "Guardar cambios" : "Guardar tarea"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
