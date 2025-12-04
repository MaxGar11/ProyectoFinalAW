import { useState } from "react";
import { Heart } from "lucide-react";
import { auth } from "../firebase/config";

export default function FeedPost({ post, onLike }) {
  const userId = auth.currentUser.uid;

  const hasLiked = post.likes?.includes(userId);
  const [isLiked, setIsLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const toggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));
    if (onLike) onLike(post.id, isLiked);
  };

  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleString()
    : post.createdAt?.toLocaleString?.() || "";

  // Compatibilidad con ambos branches
  const title = post.title || null;
  const description = post.description || post.content || null;

  // Soporte para nuevas tareas y para tu feed local
  const attachment = post.attachment || post.image || null;

  // Detectar tipo de archivo
  const isImage = attachment
    ? attachment.match(/\.(jpg|jpeg|png|webp)$/i)
    : false;

  const isDocument = attachment && !isImage;

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={
            post.createdByPhoto ||
            "https://i.pravatar.cc/100?u=" + post.createdBy
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover shadow"
        />

        <div>
          <p className="font-semibold text-gray-900">
            {post.createdByName || "Usuario"}
          </p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Título */}
      {title && (
        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>
      )}

      {/* Descripción */}
      {description && (
        <p className="text-gray-700 leading-relaxed mb-3">
          {description}
        </p>
      )}

      {/* Si es imagen */}
      {isImage && (
        <img
          src={attachment}
          alt="Imagen adjunta"
          className="mt-2 rounded-xl shadow max-h-[300px] object-cover"
        />
      )}

      {/* Si es documento */}
      {isDocument && (
        <div className="mt-3 p-4 border rounded-xl bg-gray-100 flex items-center justify-between">
          <div>
            <p className="font-semibold mb-1">Archivo adjunto</p>
            <p className="text-sm text-gray-600 truncate max-w-[250px]">
              {attachment.split("/").pop()}
            </p>
          </div>

          <a
            href={attachment}
            download
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Descargar
          </a>
        </div>
      )}

      {/* Likes */}
      {onLike && (
        <button
          onClick={toggle}
          className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition mt-4"
        >
          <Heart
            size={22}
            fill={isLiked ? "red" : "none"}
            stroke={isLiked ? "red" : "gray"}
          />
          {likeCount} likes
        </button>
      )}
    </div>
  );
}
