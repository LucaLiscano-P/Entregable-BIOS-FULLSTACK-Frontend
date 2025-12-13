export const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Error al subir imagen a Cloudinary");

  const data = await res.json();
  return data.secure_url;
};