import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas privadas */}
        <Route path="/feed" 
          element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>} 
          />
        <Route path="/mis-tareas" 
          element={
          <PrivateRoute><MyTasks /></PrivateRoute>
          } 
        />
        <Route path="/crear" 
          element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
          } />
        <Route path="/editar/:id" 
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          } />
        <Route path="/perfil" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
