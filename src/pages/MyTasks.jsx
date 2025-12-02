import { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import DashboardLayout from "../layouts/DashboardLayout";

export default function MyTasks() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Simulación de tareas (esto lo reemplazará Firebase)
  const tasks = [
    {
      id: 1,
      title: "Ensayo de historia",
      description: "Escribir mínimo 2 cuartillas sobre la cultura Maya.",
      date: "2025-03-10",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Proyecto de IA",
      description:
        "Terminar diagrama UML de la red neuronal + pruebas iniciales.",
      date: "2025-03-05",
      status: "completed",
    },
    {
      id: 3,
      title: "Tarea de matemáticas",
      description: "Resolver ejercicios del 1 al 10 del libro.",
      date: "2025-03-07",
      status: "pending",
    },
  ];
   
  // Logica de filtros y búsqueda
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ? true : task.status === filter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
    <div className="flex bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Mis tareas</h1>

        {/* Filtros + Buscador */}
        <TaskFilters
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
