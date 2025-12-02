import DashboardLayout from "../layouts/DashboardLayout";
import FeedPost from "../components/FeedPost";

export default function Feed() {
  const posts = [
    {
      id: 1,
      author: "Elisabeth May",
      avatar: "https://i.pravatar.cc/150?img=47",
      time: "Hace 3 horas",
      title: "Reprogramación de clase",
      tags: ["Clases", "Avisos"],
      content:
        "Hola a todos, debido a la ausencia de la Dra. Hellen, tendremos que reprogramar la próxima clase. Aviso más información pronto.",
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
    },
  ];

  return (
    <DashboardLayout showRight={true}>
      <h1 className="text-3xl font-bold mb-6">Feed público</h1>

      {/* Crear publicación */}
      <div className="bg-white rounded-xl p-6 shadow mb-8">
        <h2 className="text-lg font-semibold mb-3">Crear publicación</h2>

        <textarea
          placeholder="Comparte un aviso o mensaje para todos..."
          className="w-full p-4 border rounded-xl shadow-sm resize-none focus:ring focus:ring-purple-300"
          rows={3}
        ></textarea>

        <div className="flex justify-end mt-3">
          <button className="bg-purple-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-purple-700 transition">
            Publicar
          </button>
        </div>
      </div>

      {/* Publicaciones */}
      <div className="flex flex-col gap-6">
        {posts.map((p) => (
          <FeedPost key={p.id} post={p} />
        ))}
      </div>
    </DashboardLayout>
  );
}
