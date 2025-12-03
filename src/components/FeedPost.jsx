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
    onLike(post.id, isLiked);
  };

  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleString()
    : "";

  // Compatibilidad con ambos branches
  const title = post.title || null;
  const description = post.description || post.content || null;
  const image = post.image || null;

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

      {/* Título (solo si existe) */}
      {title && (
        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>
      )}

      {/* Contenido / descripción */}
      {description && (
        <p className="text-gray-700 leading-relaxed mb-3">
          {description}
        </p>
      )}

      {/* Imagen (solo si existe) */}
      {image && (
        <img
          src={image}
          alt="Imagen adjunta"
          className="mt-2 rounded-xl shadow"
        />
      )}

      {/* Likes */}
      <button
        onClick={toggle}
        className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition mt-3"
      >
        <Heart
          size={22}
          fill={isLiked ? "red" : "none"}
          stroke={isLiked ? "red" : "gray"}
        />
        {likeCount} likes
      </button>
    </div>
  );
}
