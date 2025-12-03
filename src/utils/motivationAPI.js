import { axiosClient } from "./axiosClient";

export const getMotivationPhrase = async () => {
  try {
    const res = await axiosClient.get("/random");
    return {
      phrase: res.data.content,
      author: res.data.author,
    };
  } catch (error) {
    console.error("Error obteniendo frase:", error);
    return {
      phrase: "Sigue adelante, estás haciendo un gran trabajo.",
      author: "Sistema"
    };
  }
};
