"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  Switch,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { useUser } from "@/src/context/UserContext";
import dynamic from "next/dynamic";

import {
  AiOutlinePicture,
  AiOutlineVideoCamera,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdEventNote } from "react-icons/md";
// Use dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Disable server-side rendering for this component
});
import "react-quill/dist/quill.snow.css";
import { dropdownItems } from "@/src/types/index";
import Postskeleton from "@/src/components/posts/Postskeleton";
import { useCreatePost } from "@/src/hooks/Post.hooks";
import uploadImageToCloudinary from "@/src/utils/uploadImage";
import TCreatePost from "@/src/types/index";

const EditorModal = () => {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [isPremium, setIsPremium] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { mutate: createHandlePost, isPending, isSuccess } = useCreatePost();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const handlePost = async () => {
    try {
      let thumbnailImage = null;
      if (image) {
        thumbnailImage = await uploadImageToCloudinary(image);
      }

      const postData: TCreatePost = {
        title,
        description: editorValue,
        category,
        tags,
        contents: editorValue, // This corresponds to your required fields
        author: user?._id as string,
        isPremium,
        thumbnailImage: thumbnailImage || "", // Ensure this is a string
      };

      await createHandlePost(postData);
      // Reset state after successful post creation
      setTitle("");
      setEditorValue("");
      setImage(null);
      setCategory("");
      setTags([]);
      setIsPremium(false);
      handleClose(); // Close modal after posting
    } catch (error) {
      console.error("Error creating post:", error);
      // Show error message to user
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  if (isLoading) {
    return <Postskeleton />;
  }

  return (
    <div className="flex justify-center pt-8">
      <div
        className="border border-gray-300 rounded-lg p-4 shadow-lg flex flex-col items-center cursor-pointer w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl dark:bg-[#1A2B40] dark:border-gray-900"
        onClick={handleOpen}
      >
        <div className="flex items-center w-full">
          <Avatar
            src={
              user?.profileImage ||
              "https://randomuser.me/api/portraits/men/5.jpg"
            }
            alt="User"
            size="lg"
          />
          <p className="ml-4 text-gray-600 flex-grow dark:text-white">
            What's on your mind?
          </p>
        </div>

        <div className="flex justify-around w-full mt-4">
          <AiOutlinePicture className="text-2xl text-blue-500 hover:text-blue-600 cursor-pointer" />
          <AiOutlineVideoCamera className="text-2xl text-green-500 hover:text-green-600 cursor-pointer" />
          <MdEventNote className="text-2xl text-yellow-500 hover:text-yellow-600 cursor-pointer" />
          <AiOutlineFileText className="text-2xl text-purple-500 hover:text-purple-600 cursor-pointer" />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent className="dark:bg-gray-900">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Post
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4 dark:bg-gray-900 dark:text-white"
                  classNames={{
                    input: "dark:bg-gray-700 dark:text-white",
                    inputWrapper: "dark:bg-gray-700",
                  }}
                />
                <ReactQuill
                  modules={modules}
                  value={editorValue}
                  onChange={setEditorValue}
                  theme="snow"
                  style={{ height: "400px" }}
                />

                <div className="mt-12">
                  <label className="text-gray-700 dark:text-gray-300">
                    Attach Image:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="max-h-40"
                      />
                      <Button
                        onClick={handleRemoveImage}
                        color="danger"
                        size="sm"
                        className="mt-2"
                      >
                        Remove Image
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="text-gray-700 dark:text-gray-300">
                    Select Category:
                  </label>

                  <Dropdown backdrop="blur">
                    <DropdownTrigger>
                      <Button variant="bordered">
                        {category || "Select Category"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dynamic Actions"
                      items={dropdownItems}
                      onAction={(key) => handleCategoryChange(key as string)}
                    >
                      {(item) => (
                        <DropdownItem
                          key={item.key}
                          color={item.key === "delete" ? "danger" : "default"}
                          className={item.key === "delete" ? "text-danger" : ""}
                        >
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="mt-4">
                  <Input
                    label="Tags"
                    placeholder="Enter tags separated by commas"
                    value={tags.join(", ")}
                    onChange={handleTagsChange}
                    classNames={{
                      input: "dark:bg-gray-700 dark:text-white",
                      inputWrapper: "dark:bg-gray-700",
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="text-gray-700 dark:text-gray-300">
                    Mark as Premium:
                  </label>
                  <Switch
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    color="primary"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handlePost}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditorModal;
