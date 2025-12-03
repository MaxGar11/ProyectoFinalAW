import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import FeedPost from "../components/FeedPost";
import MotivationalQuote from "../components/MotivationalQuote";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

// Hooks del branch maxdev
import { useTasks } from "../hooks/useTasks";
import { auth } from "../firebase/config";

export default function Feed() {
  // Publicaciones reales de Firestore (maxdev)
  const { getPublicTasks, toggleLike } = useTasks();
  const [publicTasks, setPublicTasks] = useState([]);

  // Tus publicaciones locales (mock + imagen)
  const [feedPosts, setFeedPosts] = useState([]);

  // Formulario
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar tareas públicas reales
  useEffect(() => {
    const load = async () => {
      const tasks = await getPublicTasks();

      tasks.sort(
        (a, b) => b.createdAt?.toMillis?.() - a.createdAt?.toMillis?.()
      );

      setPublicTasks(tasks);
    };
    load();
  }, []);

  // Likes reales
  const handleLike = async (taskId, hasLiked) => {
    await toggleLike(taskId, hasLiked);

    setPublicTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              likes: hasLiked
                ? t.likes.filter((uid) => uid !== auth.currentUser.uid)
                : [...(t.likes || []), auth.currentUser.uid],
            }
          : t
      )
    );
  };

  // Manejo de imagen local
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Crear publicación local temporal
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
      createdByName: auth.currentUser.displayName || "Usuario Actual",
      createdByPhoto: auth.currentUser.photoURL,
      createdAt: new Date(),
      title: "Nueva publicación",
      description: text,
      content: text,
      image: imageUrl,
      likes: [],
    };

    setFeedPosts([newPost, ...feedPosts]);

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
          placeholder="Comparte un aviso o mensaje..."
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
            className="bg-purple-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      {/* Publicaciones locales (tuyas) */}
      <div className="flex flex-col gap-6">
        {feedPosts.map((p) => (
          <FeedPost key={p.id} post={p} />
        ))}

        {/* Publicaciones reales del backend */}
        {publicTasks.map((p) => (
          <FeedPost key={p.id} post={p} onLike={handleLike} />
        ))}
      </div>
    </DashboardLayout>
  );
}
