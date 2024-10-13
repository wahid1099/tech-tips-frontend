import axios from "axios";
import { toast } from "sonner";

const uploadImageToCloudinary = async (
  imageFile: File | null
): Promise<string | undefined> => {
  const cloudName = "do9k3niww";
  const uploadPreset = "imageUpload";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // Check if imageFile is null or undefined
  if (!imageFile) {
    return undefined;
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.secure_url; // Return the uploaded image URL
  } catch (error) {
    // Check if it's an Axios error and extract the message
    if (axios.isAxiosError(error)) {
      toast.error(`Image upload failed: ${error.message}`);
    } else {
      toast.error("Image upload failed due to an unknown error.");
    }

    return undefined; // Return undefined in case of failure
  }
};

export default uploadImageToCloudinary;
