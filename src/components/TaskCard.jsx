import { FaCheckCircle, FaTrash, FaEdit, FaFileDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onDelete, onToggleComplete, onEdit }) {
  const navigate = useNavigate();

  // Soporte para image / attachment
  const attachment = task.attachment || task.image || null;

  // Detectar si es imagen o archivo
  const isImage = attachment
    ? attachment.match(/\.(jpg|jpeg|png|webp)$/i)
    : false;

  const isDocument = attachment && !isImage;

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
      {task.description && (
        <p className="text-gray-600 mt-2">{task.description}</p>
      )}

      {/* Fecha */}
      <p className="text-gray-400 text-sm mt-1">
        {task.date ? `Creada el ${task.date}` : ""}
      </p>

      {/* Imagen adjunta */}
      {isImage && (
        <img
          src={attachment}
          alt="Adjunto"
          className="mt-3 rounded-lg shadow max-h-52 object-cover"
        />
      )}

      {/* Documento adjunto */}
      {isDocument && (
        <div className="mt-3 p-3 bg-gray-100 rounded-lg border flex justify-between items-center">
          <div>
            <p className="font-semibold">Archivo adjunto</p>
            <p className="text-gray-600 text-sm truncate max-w-[180px]">
              {attachment.split("/").pop()}
            </p>
          </div>

          <a
            href={attachment}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaFileDownload />
            Abrir
          </a>

        </div>
      )}

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

        {/* Editar */}
        <button
          onClick={onEdit}
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
