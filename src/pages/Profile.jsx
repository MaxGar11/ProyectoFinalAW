import Sidebar from "../components/Sidebar";
import useUsuario from "../hooks/useUsuario";
import { useNavigate } from "react-router-dom";
import { onSignOut, getInfoUsuarioActual, updateInfoUsuarioActual } from "../firebase/user";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { getAuth, updateProfile } from "firebase/auth";

import { useEffect, useState } from "react";

export default function Profile() {
    const usuario = useUsuario();
    const navigate = useNavigate();

    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [nuevaFoto, setNuevaFoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [subiendo, setSubiendo] = useState(false);

    useEffect(() => {
        if (!usuario) return;

        const cargarDatos = async () => {
            const datos = await getInfoUsuarioActual();
            if (datos) {
                setPerfil(datos);
            }
            setCargando(false);
        };

        cargarDatos();
    }, [usuario]);

    const handleChangeFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validación básica
        if (!file.type.startsWith("image/")) {
            alert("Debes seleccionar una imagen válida.");
            return;
        }

        setNuevaFoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const guardarCambios = async () => {
        if (!usuario) return;

        try {
            setSubiendo(true);

            let urlFoto = perfil.photoURL || usuario.photoURL;

            // Si hay nueva foto → subir a Cloudinary
            if (nuevaFoto) {
                urlFoto = await uploadToCloudinary(nuevaFoto);
            }

            // Guardar en Firestore
            await updateInfoUsuarioActual({
                nombre: perfil.nombre,
                escuela: perfil.escuela,
                tipoUsuario: perfil.tipoUsuario,
                photoURL: urlFoto,
            });

            // Guardar también en Firebase Auth (usuario actual)
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                photoURL: urlFoto,
            });

            setPerfil((prev) => ({ 
                ...prev, 
                photoURL: urlFoto 
            }));

            alert("Los cambios se han realizado con éxito.");
            setNuevaFoto(null);
            setPreview(null);            
        } catch (err) {
            console.error("ERROR AL GUARDAR:", err);
            alert("Ocurrió un error al guardar los cambios.");
        } finally {
            setSubiendo(false);
        }
    };

    if (cargando || !perfil) {
        return (
            <div className="p-10 text-center text-gray-600">
                Cargando...
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Mi perfil</h1>

                <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">

                    <form className="flex flex-col gap-6">

                        {/* FOTO */}
                        <div className="flex items-center gap-4">
                            <img
                                src={perfil.photoURL || usuario.photoURL || "https://i.pinimg.com/236x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg"}
                                alt="Foto de perfil"
                                className="w-20 h-20 rounded-full object-cover border"
                            />


                            <label className="cursor-pointer text-blue-600 font-semibold hover:underline">
                            Cambiar foto
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleChangeFoto}
                            />
                            </label>
                        </div>

                        {/* NOMBRE */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                value={perfil.nombre}
                                onChange={(e) =>
                                    setPerfil({ ...perfil, nombre: e.target.value })
                                }
                                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* CORREO */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                value={usuario.email}
                                disabled
                                className="w-full p-3 border rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                El correo no puede modificarse.
                            </p>
                        </div>

                        {/* ESCUELA */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Escuela de procedencia
                            </label>
                            <input
                                type="text"
                                value={perfil.escuela}
                                onChange={(e) =>
                                    setPerfil({ ...perfil, escuela: e.target.value })
                                }
                                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* TIPO USUARIO */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Tipo de usuario
                            </label>
                            <select
                                value={perfil.tipoUsuario}
                                onChange={(e) =>
                                    setPerfil({ ...perfil, tipoUsuario: e.target.value })
                                }
                                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
                            >
                                <option value="alumno">Alumno</option>
                                <option value="docente">Docente</option>
                            </select>
                        </div>

                        {/* GUARDAR */}
                        <button
                            type="button"
                            onClick={guardarCambios}
                            className="mt-4 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition"
                        >
                            Guardar cambios
                        </button>

                        {/* CERRAR SESIÓN */}
                        <button
                            type="button"
                            onClick={() => onSignOut(navigate)}
                            className="mt-4 bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition"
                        >
                            Cerrar sesión
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
