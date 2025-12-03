import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const AuthContext = createContext();

// Provider que envuelve toda la app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario almacenado (si existe)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 Login (puedes cambiarlo por tu backend/Firebase)
  const login = async (email, password) => {
    // Simulación de login, reemplaza por tu API
    const fakeUser = { id: 1, name: "Usuario", email };

    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook fácil de usar
export function useAuth() {
  return useContext(AuthContext);
}
