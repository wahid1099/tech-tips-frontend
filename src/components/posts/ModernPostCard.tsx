"use client";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaCheckCircle,
  FaShareAlt,
  FaBookmark,
  FaEye,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { TPost } from "@/src/types";
import { useUser } from "@/src/context/UserContext";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useVotePost } from "@/src/hooks/Post.hooks";
import { toast } from "sonner";
import { useToggleFollow } from "@/src/hooks/user.hook";
import { motion, AnimatePresence } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const ModernPostCard = ({ post }: { post: TPost }) => {
  const { mutate: createVote } = useVotePost();
  const { mutate: createFollow } = useToggleFollow();
  const { user } = useUser();
  const [shareVisible, setShareVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShareClick = () => {
    setShareVisible(!shareVisible);
  };

  const hasUpvoted =
    Array.isArray(post?.upVotes) && post?.upVotes.includes(user?._id || "");
  const hasDownvoted =
    Array.isArray(post?.downVotes) && post?.downVotes.includes(user?._id || "");

  const handleVotes = async (postId: string, action: string) => {
    try {
      await createVote({ postId, action });
      const successMessage = `You have ${action}d the post!`;
      toast.success(successMessage);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  const handleFollow = (followingId: string) => {
    if (user) {
      createFollow(followingId);
      toast.success("You are now following the user");
    } else {
      window.location.href = `/auth?redirect=/${post?._id}`;
    }
  };

  const shouldBlur = post.isPremium && (!user || user.payments.length === 0);
  const postUrl = `https://techtipshubwahid.netlify.app/${post._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-6"
    >
      <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-3">
              <Avatar
                src={post.author.profileImage || "/default-profile.png"}
                alt={post.author.name}
                size="md"
                className="ring-2 ring-blue-500/20"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {post.author.name}
                  </h4>
                  {post.author.isVerified && (
                    <FaCheckCircle
                      className="text-blue-500 text-sm"
                      title="Verified"
                    />
                  )}
                  {post.isPremium && (
                    <Chip size="sm" color="warning" variant="flat">
                      Premium
                    </Chip>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()} •
                  <span className="ml-1 flex items-center gap-1">
                    <FaEye className="text-xs" />
                    {Math.floor(Math.random() * 1000) + 100} views
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user?._id !== post?.author?._id && (
                <Button
                  size="sm"
                  color={
                    user?.following.includes(post?.author?._id)
                      ? "default"
                      : "primary"
                  }
                  variant={
                    user?.following.includes(post?.author?._id)
                      ? "flat"
                      : "solid"
                  }
                  onClick={() => handleFollow(post?.author?._id)}
                  disabled={user?.following.includes(post?.author?._id)}
                  className="font-medium"
                >
                  {user?.following.includes(post?.author?._id)
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

        <CardBody className={`pt-0 ${shouldBlur ? "blur-sm" : ""}`}>
          <div className="space-y-4">
            {/* Post Title */}
            <Link href={`/${post._id}`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">
                {post.title}
              </h2>
            </Link>

            {/* Post Description */}
            <div
              className="text-gray-700 dark:text-gray-300 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />

            {/* Post Image */}
            {post?.thumbnailImage && (
              <div className="relative overflow-hidden rounded-xl group">
                <Link href={`/${post._id}`}>
                  <Image
                    alt={post.title}
                    className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    height={256}
                    src={post.thumbnailImage}
                    width={600}
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Post Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
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
              {post.tags.length > 3 && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="default"
                  className="text-xs"
                >
                  +{post.tags.length - 3} more
                </Chip>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                    hasUpvoted
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => handleVotes(post._id, "upvote")}
                >
                  <FaThumbsUp className="text-sm" />
                  <span className="text-sm font-medium">
                    {post?.upVotes?.length || 0}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                    hasDownvoted
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => handleVotes(post._id, "downvote")}
                >
                  <FaThumbsDown className="text-sm" />
                  <span className="text-sm font-medium">
                    {post?.downVotes?.length || 0}
                  </span>
                </motion.button>

                <Link href={`/${post._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200"
                  >
                    <FaComment className="text-sm" />
                    <span className="text-sm font-medium">
                      {post.comments.length}
                    </span>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200"
                  onClick={handleShareClick}
                >
                  <FaShareAlt className="text-sm" />
                  <span className="text-sm font-medium">Share</span>
                </motion.button>
              </div>

              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-blue-500" : "text-gray-400"}
              >
                <FaBookmark />
              </Button>
            </div>

            {/* Social Media Share Buttons */}
            <AnimatePresence>
              {shareVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700"
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
          </div>
        </CardBody>
      </Card>

      {/* Premium Overlay */}
      {shouldBlur && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm rounded-xl"
        >
          <div className="text-center space-y-4">
            <div className="text-4xl">🔒</div>
            <h3 className="text-xl font-bold text-white">Premium Content</h3>
            <p className="text-gray-200 max-w-sm">
              Unlock this exclusive content and thousands more with a premium
              membership.
            </p>
            <Button
              size="lg"
              color="primary"
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold"
            >
              Upgrade to Premium
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModernPostCard;
