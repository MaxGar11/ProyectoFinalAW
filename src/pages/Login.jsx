import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario, registroUsuario } from "../firebase/user";
import useUsuario from "../hooks/useUsuario";

const Login = () => {
    const user = useUsuario()
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        nombre: "",
        escuela: "",
        tipoUsuario: "",
        email: "",
        password: "",
        error: "", 
    });

    useEffect(() => {
        if (user) {
            navigate("/mis-tareas");
        }
    }, [user]);

    const handleSubmit = () => {
        if (isLogin) {
            loginUsuario(formData, setFormData);
        } else {
            registroUsuario(formData, setFormData);
        }

        setTimeout(() => setFormData({ ...formData, error: "" }), 3000);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl w-96 p-8">
            <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            {isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
            </h2>

            { !isLogin ? 
                <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mt-6 mb-2 border-b pb-1">
                    Información personal
                </p>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                /> 
                <input
                    type="text"
                    placeholder="Escuela de procedencia"
                    className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.escuela}
                    onChange={(e) => setFormData({ ...formData,escuela: e.target.value })}
                />
                <div className="mb-4">
                    <p className="text-gray-700 mb-2 font-medium">Tipo de usuario:</p>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="tipoUsuario"
                                value="alumno"
                                checked={formData.tipoUsuario === "alumno"}
                                onChange={(e) => setFormData({ ...formData, tipoUsuario: e.target.value })}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-400"
                            />
                            <span className="text-gray-700">Alumno</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="tipoUsuario"
                                value="docente"
                                checked={formData.tipoUsuario === "docente"}
                                onChange={(e) => setFormData({ ...formData, tipoUsuario: e.target.value })}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-400"
                            />
                            <span className="text-gray-700">Docente</span>
                        </label>
                    </div>
                </div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mt-6 mb-2 border-b pb-1">
                    Información de inicio de sesión
                </p>
                </div>
                : null
            }

            {/* INPUT EMAIL */}
            <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            {/* INPUT PASSWORD */}
            <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700
                        focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
            }
            />

            {/* TEXTO DE ERROR */}
            {formData.error && (
            <p className="text-red-500 text-sm text-center mb-2">
                {formData.error}
            </p>
            )}

            {/* BOTÓN SUBMIT */}
            <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium 
                        hover:bg-blue-700 transition-all"
            >
            {isLogin ? "Iniciar sesión" : "Registrarse"}
            </button>

            {/* CAMBIO LOGIN <-> REGISTRO */}
            <p className="text-center text-gray-600 mt-4">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
            >
                {isLogin ? "Crear cuenta" : "Ingresar"}
            </span>
            </p>
        </div>
        </div>
    );
};

export default Login;
