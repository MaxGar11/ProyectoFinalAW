export default function FeedPost({ post }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{post.author}</h3>
          <p className="text-gray-500 text-sm">{post.time}</p>
        </div>
      </div>

      {/* Título */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>

      {/* Etiquetas */}
      <div className="flex gap-2 mb-4">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Contenido */}
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      {/* Acciones */}
      <button className="mt-4 text-blue-600 font-semibold hover:underline">
        Añadir respuesta
      </button>
    </div>
  );
}
