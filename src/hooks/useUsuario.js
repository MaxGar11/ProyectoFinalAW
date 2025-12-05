import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const useUsuario = () => {
    const [usuario, setUsuario] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUsuario(null);
                return;
            }

            // Obtener datos desde Firebase Auth
            let userData = {
                uid: user.uid,
                email: user.email,
                photoURL: user.photoURL || null,
                displayName: user.displayName || null,
            };

            // Obtener datos desde Firestore
            const ref = doc(db, "usuarios", user.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                const data = snap.data();

                userData = {
                    ...userData,
                    nombre: data.nombre || user.displayName || "Usuario",
                    escuela: data.escuela || "",
                    tipoUsuario: data.tipoUsuario || "",
                    photoURL: data.photoURL || user.photoURL || null,
                };
            }

            setUsuario(userData);
        });

        return () => unsubscribe();
    }, []);

    return usuario;
};

export default useUsuario;
