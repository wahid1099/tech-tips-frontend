"use client";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaCheckCircle,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { TPost } from "@/src/types";
import { useUser } from "@/src/context/UserContext";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { useVotePost } from "@/src/hooks/Post.hooks";
import { toast } from "sonner";

const PostCard = ({ post }: { post: TPost }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const { mutate: createVote } = useVotePost();
  // State to track loading
  console.log(post);
  const { user } = useUser();
  // Check if the user has already upvoted or downvoted the post
  const hasUpvoted =
    Array.isArray(post?.upVotes) && post?.upVotes.includes(user?._id || "");
  const hasDownvoted =
    Array.isArray(post?.downVotes) && post?.downVotes.includes(user?._id || "");

  // Handle voting
  const handleVotes = async (postId: string, action: string) => {
    try {
      let voteAction = action;

      // Remove the upvote if the user already upvoted
      if (action === "upvote") {
        voteAction = "upvote";
      }
      // Remove the downvote if the user already downvoted
      else if (action === "downvote") {
        voteAction = "downvote";
      }

      console.log("action", voteAction); // Debugging: Log the action being taken

      // Send the request to the backend
      await createVote({ postId, action: voteAction });

      // Show success toast message
      const successMessage = voteAction.startsWith("remove")
        ? `You have removed your ${action === "upvote" ? "upvote" : "downvote"}!`
        : `You have ${action}d the post!`;
      toast.success(successMessage);
    } catch (error) {
      console.error(error); // Log error for debugging
      toast.error("Something went wrong. Please try again!");
    } finally {
    }
  };

  const shouldBlur = post.isPremium && (!user || user.payments.length === 0);

  return (
    <div className="relative flex justify-center my-4">
      {/* Main post card content */}
      <div
        className={`w-full md:w-1/2 lg:w-1/3 border p-4 rounded-lg bg-white dark:bg-gray-800 transition-colors shadow-lg ${
          shouldBlur ? "blur-sm" : ""
        }`}
      >
        {/* Header: User Info, Follow Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Image
              src={post.author.profileImage || "/default-profile.png"}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                {post.author.name}
                {post.author.isVerified && (
                  <FaCheckCircle
                    className="ml-2 text-blue-500"
                    title="Verified"
                  />
                )}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors">
            Follow
          </button>
        </div>

        {/* Post Content */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {post.title}
          </h2>
          <p
            className="text-gray-700 dark:text-gray-300 mb-3"
            dangerouslySetInnerHTML={{ __html: post.description }} // Using dangerouslySetInnerHTML for HTML descriptions
          />

          <div className="overflow-hidden relative ">
            {post?.thumbnailImage ? (
              <Image
                alt="Small robot"
                className="object-cover cursor-pointer w-full h-[250px] transition-transform duration-300 group-hover:scale-110"
                height={250}
                src={post.thumbnailImage}
                width={400}
              />
            ) : (
              // Optionally, you can render a placeholder or nothing if no image is available
              <div className="w-full h-[250px] flex items-center justify-center bg-gray-200">
                {/* <p className="text-gray-500">No image available</p> */}
              </div>
            )}
          </div>
        </div>

        {/* Post Actions: Upvote, Downvote, Comment */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button
              className={`flex items-center ${hasUpvoted ? "text-blue-500" : "text-gray-700"} dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400`}
              onClick={(e) => {
                e.preventDefault();
                handleVotes(post._id, "upvote");
              }}
            >
              <FaThumbsUp className="mr-2" />
              {post?.upVotes?.length || 0} Likes
            </button>
            <button
              className={`flex items-center ${hasDownvoted ? "text-red-500" : "text-gray-700"} dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400`}
              onClick={(e) => {
                e.preventDefault();
                handleVotes(post._id, "downvote");
              }}
            >
              <FaThumbsDown className="mr-2" />
              {post?.downVotes?.length || 0} Likes
            </button>
          </div>
          <Link
            href={`/${post._id}`}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
          >
            <FaComment className="mr-2" />
            {post.comments.length} Comments
          </Link>
        </div>

        {/* Post Tags */}
        <div className="mt-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Premium Overlay */}
      {shouldBlur && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-600 transition-colors">
            Become Premium to View
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
