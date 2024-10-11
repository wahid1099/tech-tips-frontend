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
} from "@nextui-org/react";
import {
  AiOutlinePicture,
  AiOutlineVideoCamera,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdEventNote } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex justify-center pt-8 ">
      {/* Card Component */}
      <div
        className="border border-gray-300 rounded-lg p-4 shadow-lg flex flex-col items-center cursor-pointer w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl dark:bg-[#1A2B40] dark:border-gray-900 "
        onClick={handleOpen}
      >
        <div className="flex items-center w-full">
          <Avatar
            src="https://randomuser.me/api/portraits/men/5.jpg"
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

      {/* Modal with Quill Editor */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent className="dark:bg-gray-900">
          <ModalHeader>Create Post</ModalHeader>
          <ModalBody>
            <ReactQuill
              value={editorValue}
              onChange={setEditorValue}
              theme="snow"
              style={{ height: "400px" }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleClose}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditorModal;
