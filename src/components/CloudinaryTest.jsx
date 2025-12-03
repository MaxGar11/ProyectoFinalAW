import { useState } from "react";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function CloudinaryTest() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    const result = await uploadToCloudinary(file);
    setUrl(result);
  };

  return (
    <div className="p-6">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Subir imagen
      </button>

      {url && (
        <img src={url} className="mt-4 w-48" alt="uploaded" />
      )}
    </div>
  );
}
