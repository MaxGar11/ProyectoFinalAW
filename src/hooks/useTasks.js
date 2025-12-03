import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const tasksRef = collection(db, "tasks");

  // ========================
  // Detectar usuario real
  // ========================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });

    return () => unsub();
  }, []);

  // ========================
  // Obtener tareas del usuario actual
  // ========================
  const getUserTasks = async () => {
    if (!currentUser) return;

    const q = query(
      tasksRef,
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTasks(data);
  };

  // ========================
  // Crear tarea
  // ========================
  const createTask = async ({ title, description, isPublic }) => {
    if (!currentUser) return;

    await addDoc(tasksRef, {
      title,
      description,
      isPublic,
      completed: false,
      createdAt: new Date(),
      userId: currentUser.uid,
      createdByName: currentUser.displayName || "Usuario",
      createdByPhoto: currentUser.photoURL || null,
      likes: [],
    });

    getUserTasks();
  };

  // ========================
  // Obtener tarea por ID
  // ========================
  const getTaskById = async (id) => {
    const ref = doc(db, "tasks", id);
    const snap = await getDoc(ref);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  };

  // ========================
  // Editar tarea
  // ========================
  const updateTask = async (id, data) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, data);
    getUserTasks();
  };

  // ========================
  // Marcar como completada
  // ========================
  const toggleComplete = async (id, completed) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, { completed });
    getUserTasks();
  };

  // ========================
  // Eliminar tarea
  // ========================
  const deleteTask = async (id) => {
    const ref = doc(db, "tasks", id);
    await deleteDoc(ref);
    getUserTasks();
  };

  // ========================
  // Feed público global
  // ========================
  const getPublicTasks = async () => {
    const q = query(
      collection(db, "tasks"),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data(),
    }));
  };

  // ========================
  // Tareas públicas por usuario
  // ========================
  const getTasksByUserId = async (uid) => {
    const q = query(
      tasksRef,
      where("userId", "==", uid),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  };

  // ========================
  // Like / Unlike
  // ========================
  const toggleLike = async (taskId, hasLiked) => {
    const taskRef = doc(db, "tasks", taskId);
    const userId = auth.currentUser.uid;

    await updateDoc(taskRef, {
      likes: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
    });
  };

  // ========================
  // Cargar tareas al inicio
  // ========================
  useEffect(() => {
    if (currentUser) getUserTasks();
  }, [currentUser]);

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getUserTasks,
    getPublicTasks,
    getTasksByUserId,
    getTaskById,
    toggleLike,
  };
};
