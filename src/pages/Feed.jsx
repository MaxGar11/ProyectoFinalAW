import DashboardLayout from "../layouts/DashboardLayout";
import FeedPost from "../components/FeedPost";
import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { auth } from "../firebase/config";


export default function Feed() {
  const { getPublicTasks, toggleLike } = useTasks();
  const [publicTasks, setPublicTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const tasks = await getPublicTasks();

      // Ordenar por fecha descendente
      tasks.sort((a, b) =>
        b.createdAt?.toMillis?.() - a.createdAt?.toMillis?.()
      );

      setPublicTasks(tasks);
    };
    load();
  }, []);

  const handleLike = async (taskId, hasLiked) => {
    await toggleLike(taskId, hasLiked);

    // Actualizar UI sin recargar
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

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Tareas Compartidas</h1>

      {/* Publicaciones */}
      <div className="flex flex-col gap-6">
        {publicTasks.map((p) => (
          <FeedPost key={p.id} post={p} onLike={handleLike} />
        ))}
      </div>
    </DashboardLayout>
  );
}
