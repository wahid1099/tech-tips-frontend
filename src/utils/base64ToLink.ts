import axios from "axios";

import base64ToBlob from "./base64ToBlob";

const base64ToLink = async (base64Image: string) => {
  const cloudName = "di8ify5lo";
  const uploadPreset = "imageUpload";

  const blob = base64ToBlob(base64Image, "image/png");
  const file = new File([blob], `image-${Date.now()}.png`, {
    type: "image/png",
  });

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

export default base64ToLink;
