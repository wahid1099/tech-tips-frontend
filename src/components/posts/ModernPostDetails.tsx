"use client";

import React, { useState } from "react";
import moment from "moment";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  FaCheckCircle,
  FaShareAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaBookmark,
  FaEye,
  FaClock,
  FaEdit,
  FaTrash,
  FaReply,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Divider,
  Image,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
  Badge,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import CustomForm from "@/src/components/Form/CustomForm";
import { TechTextArea } from "@/src/components/Form/TechTextArea";
import { useUser } from "@/src/context/UserContext";
import {
  useDeleteComment,
  useEditComment,
  usePostComment,
  useVotePost,
} from "@/src/hooks/Post.hooks";
import { TPost } from "@/src/types";
import { useToggleFollow } from "@/src/hooks/user.hook";

const ModernPostDetails = ({ post }: { post: TPost }) => {
  const { user } = useUser();
  const { mutate: handlePostComment, isPending } = usePostComment();
  const { mutate: handleEditComment } = useEditComment();
  const { mutate: handleDeleteComment } = useDeleteComment();
  const { mutate: createVote } = useVotePost();
  const { mutate: createFollow } = useToggleFollow();

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [shareVisible, setShareVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const postUrl = `https://techtipshubwahid.netlify.app/${post._id}`;
  const hasUpvoted =
    Array.isArray(post?.upVotes) && post?.upVotes.includes(user?._id || "");
  const hasDownvoted =
    Array.isArray(post?.downVotes) && post?.downVotes.includes(user?._id || "");

  const handleSubmitComment: SubmitHandler<FieldValues> = (data) => {
    const commentInfo = {
      postId: post._id,
      comment: {
        user: user?._id,
        ...data,
      },
    };
    handlePostComment(commentInfo);
  };

  const handleEditComments = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleDeleteComments = (commentId: string) => {
    handleDeleteComment({ postId: post?._id, commentId });
  };

  const handleSaveEdit = (commentId: string) => {
    handleEditComment({
      postId: post?._id,
      commentId,
      comment: { content: editContent },
    });
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleFollow = (followingId: string) => {
    if (user) {
      createFollow(followingId);
      toast.success("Follow status updated!");
    } else {
      window.location.href = `/auth?redirect=/${post?._id}`;
    }
  };

  const handleVotes = (postId: string, action: string) => {
    if (user) {
      createVote({ postId, action });
    } else {
      window.location.href = `/auth?redirect=/${post?._id}`;
    }
  };

  const handleShareClick = () => {
    setShareVisible(!shareVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 overflow-hidden">
            {/* Post Header */}
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={post?.author?.profileImage}
                    alt={post?.author?.name}
                    size="lg"
                    className="ring-2 ring-blue-500/20"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {post?.author?.name}
                      </h1>
                      {post?.author?.isVerified && (
                        <FaCheckCircle className="text-blue-500 text-sm" />
                      )}
                      {post?.isPremium && (
                        <Chip size="sm" color="warning" variant="flat">
                          Premium
                        </Chip>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {moment(post?.createdAt).format("MMM DD, YYYY")}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="text-xs" />
                        {Math.floor(Math.random() * 5000) + 1000} views
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user?._id !== post?.author?._id && (
                    <Button
                      size="sm"
                      color={
                        user?.following?.includes(post?.author?._id)
                          ? "default"
                          : "primary"
                      }
                      variant={
                        user?.following?.includes(post?.author?._id)
                          ? "flat"
                          : "solid"
                      }
                      onClick={() => handleFollow(post?.author?._id)}
                      disabled={user?.following?.includes(post?.author?._id)}
                    >
                      {user?.following?.includes(post?.author?._id)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  )}

                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <HiOutlineDotsVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key="bookmark"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                      >
                        <div className="flex items-center gap-2">
                          <FaBookmark
                            className={isBookmarked ? "text-blue-500" : ""}
                          />
                          {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                        </div>
                      </DropdownItem>
                      <DropdownItem key="report">Report Post</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CardHeader>

            <CardBody className="pt-0">
              {/* Post Title */}
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {post?.title}
              </motion.h2>

              {/* Post Content */}
              <motion.div
                className="prose prose-lg dark:prose-invert max-w-none mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: post?.description }}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                />
              </motion.div>

              {/* Post Image */}
              {post?.thumbnailImage && (
                <motion.div
                  className="relative overflow-hidden rounded-xl mb-6 group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Image
                    alt={post?.title}
                    className="object-cover w-full h-96 transition-transform duration-500 group-hover:scale-105"
                    src={post.thumbnailImage}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )}

              {/* Post Tags */}
              {post?.tags && post.tags.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {post.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="text-xs"
                    >
                      #{tag}
                    </Chip>
                  ))}
                </motion.div>
              )}

              {/* Post Actions */}
              <motion.div
                className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      hasUpvoted
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                    onClick={() =>
                      handleVotes(
                        post._id,
                        hasUpvoted ? "removeUpvote" : "upvote"
                      )
                    }
                  >
                    <FaThumbsUp />
                    <span className="font-medium">
                      {post?.upVotes?.length || 0}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      hasDownvoted
                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                    onClick={() =>
                      handleVotes(
                        post._id,
                        hasDownvoted ? "removeDownvote" : "downvote"
                      )
                    }
                  >
                    <FaThumbsDown />
                    <span className="font-medium">
                      {post?.downVotes?.length || 0}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200"
                    onClick={() =>
                      document
                        .getElementById("comments")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <FaComment />
                    <span className="font-medium">
                      {post?.comments?.length || 0}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200"
                    onClick={handleShareClick}
                  >
                    <FaShareAlt />
                    <span className="font-medium">Share</span>
                  </motion.button>
                </div>

                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "text-blue-500" : "text-gray-400"}
                >
                  <FaBookmark />
                </Button>
              </motion.div>

              {/* Social Share Buttons */}
              <AnimatePresence>
                {shareVisible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4"
                  >
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Share on:
                    </span>
                    <div className="flex gap-2">
                      <FacebookShareButton url={postUrl}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={postUrl}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <LinkedinShareButton url={postUrl}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardBody>
          </Card>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
          id="comments"
        >
          <Card className="shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FaComment className="text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Comments ({post?.comments?.length || 0})
                </h2>
              </div>
            </CardHeader>

            <CardBody>
              {/* Comment Form */}
              {user ? (
                <div className="mb-8">
                  <CustomForm onSubmit={handleSubmitComment}>
                    <div className="flex gap-4">
                      <Avatar src={user?.profileImage} size="sm" />
                      <div className="flex-1">
                        <TechTextArea
                          label="Write a comment..."
                          name="content"
                          variant="bordered"
                          minRows={3}
                        />
                        <Button
                          type="submit"
                          color="primary"
                          className="mt-3"
                          isLoading={isPending}
                          disabled={isPending}
                        >
                          {isPending ? "Posting..." : "Post Comment"}
                        </Button>
                      </div>
                    </div>
                  </CustomForm>
                </div>
              ) : (
                <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Please log in to join the conversation
                  </p>
                  <Button
                    as="a"
                    href={`/auth?redirect=/${post?._id}`}
                    color="primary"
                  >
                    Log In to Comment
                  </Button>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {post?.comments?.map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <Avatar
                      src={comment?.user?.profileImage}
                      alt={comment?.user?.name}
                      size="sm"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {comment?.user?.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {moment(comment.createdAt).fromNow()}
                            </span>
                            {user?._id === comment?.user?._id && (
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                    <HiOutlineDotsVertical className="text-xs" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem
                                    key="edit"
                                    onClick={() =>
                                      handleEditComments(
                                        comment._id,
                                        comment?.content
                                      )
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <FaEdit />
                                      Edit
                                    </div>
                                  </DropdownItem>
                                  <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    onClick={() =>
                                      handleDeleteComments(comment._id)
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <FaTrash />
                                      Delete
                                    </div>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            )}
                          </div>
                        </div>

                        {editingCommentId === comment._id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              variant="bordered"
                              minRows={2}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="primary"
                                onClick={() => handleSaveEdit(comment._id)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditContent("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300">
                            {comment?.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {(!post?.comments || post.comments.length === 0) && (
                  <div className="text-center py-8">
                    <FaComment className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernPostDetails;
