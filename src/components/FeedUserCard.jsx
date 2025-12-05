import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function FeedUserCard() {
  const [user, setUser] = useState(null);
  const [extraData, setExtraData] = useState({ phone: null });

  const DEFAULT_PHOTO =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        return;
      }

      setUser(u);

      // Datos extra desde Firestore si tienes esa colección
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setExtraData(snap.data());
      }
    });

    return () => unsub();
  }, []);

  if (!user) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      {/* Foto */}
      <img
        src={user.photoURL || DEFAULT_PHOTO}
        alt="User"
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />

      {/* Nombre */}
      <h3 className="text-center text-xl font-bold text-gray-800 mb-1">
        {user.displayName || "Usuario"}
      </h3>

      <p className="text-center text-purple-700 font-semibold text-sm">
        Tú
      </p>

      {/* Datos */}
      <div className="mt-4 text-center text-gray-600">
        {extraData.phone && <p>📞 {extraData.phone}</p>}
        <p className="mt-1">📧 {user.email}</p>
      </div>
    </div>
  );
}
