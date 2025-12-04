import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import FeedPost from "../components/FeedPost";
import MotivationalQuote from "../components/MotivationalQuote";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

import { useTasks } from "../hooks/useTasks";
import { auth } from "../firebase/config";

export default function Feed() {
  const { getPublicTasks, toggleLike } = useTasks();
  const [publicTasks, setPublicTasks] = useState([]);

  const [feedPosts, setFeedPosts] = useState([]);

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const tasks = await getPublicTasks();
      tasks.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setPublicTasks(tasks);
    };
    load();
  }, []);

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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (!selected) {
      setPreview(null);
      return;
    }

    if (selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(selected.name);
    }
  };

  const handlePublish = async () => {
    if (!text.trim()) {
      alert("Escribe algo primero.");
      return;
    }

    setLoading(true);

    let attachmentUrl = null;

    try {
      if (file) {
        attachmentUrl = await uploadToCloudinary(file);
      }
    } catch (error) {
      console.error("Error subiendo archivo:", error);
    }

    const newPost = {
      id: Date.now(),
      createdByName: auth.currentUser.displayName || "Usuario Actual",
      createdByPhoto: auth.currentUser.photoURL,
      createdAt: new Date(),
      description: text,
      attachment: attachmentUrl,
      likes: [],
    };

    setFeedPosts([newPost, ...feedPosts]);

    setText("");
    setFile(null);
    setPreview(null);
    setLoading(false);
  };

  return (
    <DashboardLayout showRight={true}>
      <h1 className="text-3xl font-bold mb-6">Feed público</h1>

      <div className="mb-6">
        <MotivationalQuote />
      </div>

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
          Seleccionar archivo
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {preview && (
          <div className="mt-3">
            {file?.type?.startsWith("image/") ? (
              <img
                src={preview}
                className="w-48 rounded-xl shadow border"
                alt="preview"
              />
            ) : (
              <p className="text-gray-700 mt-2">
                Archivo seleccionado: {preview}
              </p>
            )}
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

      <div className="flex flex-col gap-6">
        {feedPosts.map((p) => (
          <FeedPost key={p.id} post={p} />
        ))}

        {publicTasks.map((p) => (
          <FeedPost key={p.id} post={p} onLike={handleLike} />
        ))}
      </div>
    </DashboardLayout>
  );
}
