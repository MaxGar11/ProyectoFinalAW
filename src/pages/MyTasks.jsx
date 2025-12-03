import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTasks } from "../hooks/useTasks";

export default function MyTasks() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const {
    tasks,
    deleteTask,
    toggleComplete,
  } = useTasks();

  const mappedTasks = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      status: task.completed ? "completed" : "pending",
      date: task.createdAt?.toDate?.().toLocaleDateString() || "",
    }));
  }, [tasks]);

  const filteredTasks = mappedTasks.filter((task) => {
    const matchesFilter = filter === "all" ? true : task.status === filter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-6">Mis tareas</h1>

          {/* Filtros */}
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}

                // Acciones conectadas
                onDelete={() => deleteTask(task.id)}
                onToggleComplete={() => toggleComplete(task.id, !task.completed)}
                onEdit={() => navigate(`/edit/${task.id}`)}  // ← AQUI LA MAGIA
              />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <p className="text-gray-500 mt-6">No hay tareas para mostrar.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
