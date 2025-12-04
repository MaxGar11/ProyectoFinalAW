export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  // Peso máximo 10MB
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error("El archivo debe pesar menos de 10MB");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Error al subir archivo");
    }

    const data = await res.json();
    return data.secure_url;
    
  } catch (error) {
    console.error("Cloudinary error:", error);
    throw error;
  }
};
