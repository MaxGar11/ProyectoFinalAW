import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/mis-tareas" element={<MyTasks />} />
        <Route path="/crear" element={<CreateTask />} />
        <Route path="/editar/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
