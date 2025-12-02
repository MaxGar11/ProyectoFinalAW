import { Navigate } from "react-router-dom";
import useUsuario from "../hooks/useUsuario";

export default function PrivateRoute({ children }) {
    const usuario = useUsuario();

    if (usuario === undefined) {
        return <p className="p-6 text-center">Cargando...</p>;
    }

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
