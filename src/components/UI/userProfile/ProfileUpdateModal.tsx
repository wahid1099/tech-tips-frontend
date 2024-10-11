"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  Input,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

const ProfileUpdateModal = ({ isOpen, onClose, user }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      profession: user.profession,
      bio: user.bio,
    },
  });

  const onSubmit = (data: any) => {
    // Handle profile update API call here
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <h2>Edit Profile</h2>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            {...register("name")}
            fullWidth
            placeholder="Enter your name"
          />
          <Input
            label="Profession"
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
          <Button type="submit">Save Changes</Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProfileUpdateModal;
