"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  Input,
  Button,
  Image,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { User } from "@/src/types/index";
import { useUserUpdate } from "@/src/hooks/Auth.hook";
import { ChangeEvent, useState } from "react";
import uploadImageToCloudinary from "@/src/utils/uploadImage";
import { toast } from "sonner"; // Added toast to handle error/success messages
import { useUser } from "@/src/context/UserContext";
import { dateToISO } from "@/src/utils/dateConverter";

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, isSetLoading } = useUser();

  const userId = user?._id;
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || ""); // Added state to track profile image

  const { mutate: updateUserMutate, isPending } = useUserUpdate(
    userId as string
  );
  const formattedBirthDate = user?.birthDate
    ? new Date(user.birthDate).toISOString().substring(0, 10)
    : "";
  const { register, handleSubmit, setValue } = useForm<User>({
    defaultValues: {
      name: user?.name || "",
      profession: user?.profession || "",
      bio: user?.bio || "",
      userName: user?.userName || "",
      email: user?.email || "",
      address: user?.address || "",
      gender: user?.gender || "",
      birthDate: formattedBirthDate,
      profileImage: user?.profileImage || "",
    },
  });

  const onSubmit = async (data: User) => {
    const userData = {
      ...data,

      profileImage, // Include profileImage from state
    };

    try {
      isSetLoading(true);
      await updateUserMutate(userData); // Trigger update mutation
      toast.success("Profile updated successfully!");
      onClose(); // Close modal on success
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    } finally {
      isSetLoading(false);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setImageUploadLoading(true);

    try {
      // Pass only the first file to the upload function
      const file = e.target.files[0]; // Single file

      const uploadedImageUrl = await uploadImageToCloudinary(file); // Assuming it returns the uploaded image URL or object

      if (uploadedImageUrl) {
        setProfileImage(uploadedImageUrl); // Assuming the URL or the relevant data from the uploaded image
        setValue("profileImage", uploadedImageUrl); // Update the form value with the new image URL
      }
    } catch (error: any) {
      toast.error("Error uploading image: " + error.message);
    } finally {
      setImageUploadLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <h2>Edit Profile</h2>
      <ModalContent className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {profileImage && <Image src={profileImage} alt="Profile Image" />}
          <Input
            label="Name"
            {...register("name")}
            fullWidth
            placeholder="Enter your name"
          />
          <Input
            label="profession"
            {...register("profession")}
            fullWidth
            placeholder="Enter your profession"
          />
          <Input
            label="Bio"
            {...register("bio")}
            fullWidth
            placeholder="Enter your bio"
          />
          <Input
            label="Address"
            {...register("address")}
            fullWidth
            placeholder="Enter your address"
          />
          <Input
            label="Gender"
            {...register("gender")}
            fullWidth
            placeholder="Enter your gender"
          />
          <Input
            label="Birth Date"
            type="date"
            {...register("birthDate")}
            fullWidth
            placeholder="Enter your birth date"
          />
          <br />
          <Input
            type="file"
            label="Profile Image"
            onChange={handleImageChange}
            fullWidth
            placeholder="Upload your profile image"
          />
          {imageUploadLoading && <p>Uploading image...</p>}
          <Button type="submit" disabled={isPending || imageUploadLoading}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProfileUpdateModal;
