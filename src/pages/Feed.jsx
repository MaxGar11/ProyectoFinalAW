import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import FeedPost from "../components/FeedPost";
import MotivationalQuote from "../components/MotivationalQuote";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function Feed() {
  // Posts iniciales (mock)
  const initialPosts = [
    {
      id: 1,
      author: "Elisabeth May",
      avatar: "https://i.pravatar.cc/150?img=47",
      time: "Hace 3 horas",
      title: "Reprogramación de clase",
      tags: ["Clases", "Avisos"],
      content:
        "Hola a todos, debido a la ausencia de la Dra. Hellen, tendremos que reprogramar la próxima clase. Aviso más información pronto.",
      image: null,
    },
    {
      id: 2,
      author: "Dr. Ronald Jackson",
      avatar: "https://i.pravatar.cc/150?img=56",
      time: "Hace 1 día",
      title: "Fecha del examen final",
      tags: ["Examen", "Académico"],
      content:
        "El examen final será reprogramado debido a la suspensión de actividades la próxima semana. En breve compartiré la nueva fecha.",
      image: null,
    },
  ];

  // Estados del formulario
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejo de selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  // Publicar post
  const handlePublish = async () => {
    if (!text.trim()) {
      alert("Escribe algo primero.");
      return;
    }

    setLoading(true);
    let imageUrl = null;

    try {
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }
    } catch (error) {
      console.error("Error subiendo imagen:", error);
    }

    const newPost = {
      id: Date.now(),
      author: "Usuario Actual",
      avatar: "https://i.pravatar.cc/150?u=me",
      time: "Justo ahora",
      title: "Nueva publicación",
      tags: ["General"],
      content: text,
      image: imageUrl,
    };

    setFeedPosts([newPost, ...feedPosts]);

    // Limpiar formulario
    setText("");
    setImageFile(null);
    setPreview(null);
    setLoading(false);
  };

  return (
    <DashboardLayout showRight={true}>
      <h1 className="text-3xl font-bold mb-6">Feed público</h1>

      {/* Frase motivacional */}
      <div className="mb-6">
        <MotivationalQuote />
      </div>

      {/* Crear publicación */}
      <div className="bg-white rounded-xl p-6 shadow mb-8">
        <h2 className="text-lg font-semibold mb-3">Crear publicación</h2>

        <textarea
          placeholder="Comparte un aviso o mensaje para todos..."
          className="w-full p-4 border rounded-xl shadow-sm resize-none focus:ring focus:ring-purple-300"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <label className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold cursor-pointer hover:bg-blue-700 transition">
          Seleccionar imagen
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>


        {/* Vista previa */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              className="w-48 rounded-xl shadow border"
              alt="preview"
            />
          </div>
        )}

        <div className="flex justify-end mt-3">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="bg-purple-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      {/* Publicaciones */}
      <div className="flex flex-col gap-6">
        {feedPosts.map((p) => (
          <FeedPost key={p.id} post={p} />
        ))}
      </div>
    </DashboardLayout>
  );
}
