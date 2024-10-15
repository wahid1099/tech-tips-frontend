"use client";
import { Tooltip, Button } from "@nextui-org/react";
import moment from "moment";
// import UpdatePostModal from "../CreatePost/UpdatePostModal";
import React, { useState } from "react";
import Image from "next/image";

import { User, TPost } from "@/src/types";
import { useUser } from "@/src/context/UserContext";
import { useDeletePost } from "@/src/hooks/Post.hooks";
import EditorModal from "./UpdatePostModal";

interface IMangeUserCellProps {
  columnKey: string;
  post: TPost;
}
const MyPostCell: React.FC<IMangeUserCellProps> = ({ columnKey, post }) => {
  const cellValue = post[columnKey];
  const { user } = useUser();
  const { mutate: deletePost } = useDeletePost();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const handleEditPost = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  switch (columnKey) {
    case "category":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        </div>
      );
    case "DESCRIPTION":
      return (
        <p
          className="text-gray-700 dark:text-gray-300 mb-3"
          dangerouslySetInnerHTML={{ __html: post?.description }} // Using dangerouslySetInnerHTML for HTML descriptions
        />
      );
    case "upVotes":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {post?.upVotes?.length} Likes
          </p>
        </div>
      );
    case "downVotes":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {post?.downVotes?.length} UnLikes
          </p>
        </div>
      );
    case "comments":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {post?.comments?.length} Comments
          </p>
        </div>
      );

    case "createdAt":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {moment(post?.createdAt).format("MMM DD, YYYY")}
          </p>
        </div>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip
            color="warning"
            content={"Are you sure you want to Update this user?"}
          >
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditorModal
                post={post}
                isEdit={true}
                closeModal={handleCloseModal}
              />
            </span>
          </Tooltip>
          <Tooltip>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" />
          </Tooltip>
          <Tooltip
            color="danger"
            content={"Are you sure you want to delete this post?"}
          >
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Button
                className="hover:bg-red-600 hover:text-white duration-300"
                radius="none"
                size="lg"
                variant="bordered"
                onClick={() => handleDeletePost(post?._id)}
              >
                Delete Post
              </Button>
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default MyPostCell;
