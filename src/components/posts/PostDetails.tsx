/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
"use client";

import React, { useState } from "react";
import moment from "moment";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaCheckCircle, FaShareAlt } from "react-icons/fa";
import {
  CalendarDays,
  BarChart2,
  ThumbsDown,
  ThumbsUp,
  BadgeCheck,
} from "lucide-react";
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
  Link,
} from "@nextui-org/react";
import { FaVoteYea } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

const PostData = ({ post }: { post: TPost }) => {
  const { user } = useUser();
  const { mutate: handlePostComment, isPending, isSuccess } = usePostComment();
  const { mutate: handleEditComment } = useEditComment();
  const { mutate: handleDeleteComment } = useDeleteComment();
  const { mutate: createVote } = useVotePost();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [shareVisible, setShareVisible] = useState(false); // State to show/hide share buttons

  const handleShareClick = () => {
    setShareVisible(!shareVisible); // Toggle visibility of share buttons
  };
  const { mutate: createFollow } = useToggleFollow();
  const router = useRouter();
  const postUrl = `https://techtipshubwahid.netlify.app/${post._id}`; // Adjust to your website's URL
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
    setContent(currentContent);
  };

  const handleDeleteComments = (commentId: string) => {
    handleDeleteComment({ postId: post?._id, commentId });
  };

  const handleCancel = () => {
    setEditingCommentId(null);
  };

  const handleSaveClick = (commentId: string) => {
    handleEditComment({ postId: post?._id, commentId, comment: { content } });
    setEditingCommentId(null);
  };
  const handleFollow = (followingId: string) => {
    createFollow(followingId);
  };
  const handleVotes = (postId: string, action: string) => {
    createVote({ postId, action });
  };
  const hasUpvoted =
    Array.isArray(post?.upVotes) && post?.upVotes.includes(user?._id || "");
  const hasDownvoted =
    Array.isArray(post?.downVotes) && post?.downVotes.includes(user?._id || "");

  const isPremiumPost = post?.isPremium && post?.author?.isVerified;

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden p-4 dark:bg-gray-800">
          <CardHeader>
            <div className="flex justify-between space-x-4">
              <div className="flex space-x-4">
                <Avatar
                  alt={post?.author?.name}
                  src={post?.author?.profileImage}
                />
                <div>
                  <h1 className="text-2xl font-semibold mb-2 md:mb-0 flex items-center">
                    {post?.author?.name}
                    {user?.isVerified && (
                      <span className="ml-2 inline-flex items-center justify-center bg-blue-500 text-white font-bold text-xs rounded-full">
                        <BadgeCheck />
                      </span>
                    )}
                  </h1>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    <time dateTime={post?.createdAt}>
                      {moment(post?.createdAt).format("MMM DD, YYYY")}
                    </time>
                  </div>
                </div>
              </div>
              <div className="mt-1 ">
                {user?._id !== post?.author?._id && (
                  <button
                    className={`bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors ${
                      user?.following.includes(post?.author?._id)
                        ? "bg-gray-500 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => {
                      if (user) {
                        handleFollow(post?.author?._id); // Follow action
                      } else {
                        window.location.href = `/auth?redirect=/${post?._id}`; // Redirect if not logged in
                      }
                    }}
                    disabled={user?.following.includes(post?.author?._id)} // Optionally disable the button if already following
                  >
                    {user?.following.includes(post?.author?._id)
                      ? "Following"
                      : "Follow"}{" "}
                    {/* Change text based on following status */}
                  </button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="prose-sm">
              <div
                dangerouslySetInnerHTML={{ __html: post?.description }}
                className="mb-4"
              />
            </div>
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
          </CardBody>
          <div className="p-6 bg-muted/50">
            <div className="flex flex-wrap items-center justify-between w-full gap-4">
              <div className="flex space-x-4 items-center">
                <Button size="sm" variant="ghost">
                  <FaVoteYea className="w-4 h-4 mr-2" />
                  {post?.upVotes?.length || 0} Upvotes
                </Button>
                <Button size="sm" variant="ghost">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  {post?.comments?.length || 0} Comments
                </Button>

                <button
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  onClick={handleShareClick}
                >
                  <FaShareAlt className="mr-2" />
                  Share
                </button>

                {/* Social Media Share Buttons */}
                {shareVisible && (
                  <div className="flex space-x-4 mt-4">
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
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  as={Link}
                  className={`${
                    hasUpvoted
                      ? "bg-blue-500 text-white"
                      : "text-blue-500 border-blue-500"
                  }`}
                  href={user ? "#" : `/auth?redirect=/${post?._id}`}
                  size="sm"
                  variant="bordered"
                  onClick={(e) => {
                    if (user) {
                      e.preventDefault();
                      handleVotes(
                        post?._id,
                        hasUpvoted ? "removeUpvote" : "upvote"
                      );
                    }
                  }}
                >
                  <ThumbsUp className={"w-4 h-4 mr-2 "} />
                  Like
                </Button>
                <Button
                  as={Link}
                  className={`${
                    hasDownvoted
                      ? "bg-red-500 text-white"
                      : "text-red-500 border-red-500"
                  }`}
                  href={user ? "#" : `/atuh?redirect=/${post?._id}`}
                  size="sm"
                  variant="bordered"
                  onClick={(e) => {
                    if (user) {
                      e.preventDefault();
                      handleVotes(
                        post?._id,
                        hasDownvoted ? "removeDownvote" : "downvote"
                      );
                    }
                  }}
                >
                  <ThumbsDown className={"w-4 h-4 mr-2"} />
                  Dislike
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-4 dark:bg-gray-800" id="comment">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Comments</h2>
          </CardHeader>
          <CardBody className="overflow-y-auto max-h-60">
            {post?.comments.map((comment) => (
              <div key={comment._id} className="mb-6 last:mb-0">
                <div className="flex items-start space-x-4">
                  <Avatar
                    alt={comment?.user?.profileImage}
                    src={comment?.user?.profileImage}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">
                        {comment?.user?.name}
                      </h4>
                      <time className="text-xs text-muted-foreground">
                        {moment(comment.createdAt).format("MMM DD, YYYY")}
                      </time>
                    </div>
                    {editingCommentId === comment._id ? (
                      <textarea
                        className="mt-2"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm">{comment?.content}</p>
                    )}
                    {user?._id === comment?.user?._id && (
                      <div className="flex items-center space-x-2 mt-2">
                        {editingCommentId === comment._id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSaveClick(comment._id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="bordered"
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              radius="none"
                              size="sm"
                              variant="bordered"
                              onClick={() =>
                                handleEditComments(
                                  comment._id,
                                  comment?.content
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              radius="none"
                              size="sm"
                              variant="bordered"
                              onClick={() => handleDeleteComments(comment._id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Divider className="my-4" />
              </div>
            ))}
          </CardBody>
          <CustomForm onSubmit={handleSubmitComment}>
            <TechTextArea
              label="write a comment"
              name="content"
              radius="none"
              variant="bordered"
            />

            {user ? (
              <Button
                className="mt-4"
                content="plese Login to comment"
                radius="none"
                size="sm"
                type="submit"
                variant="bordered"
                // disabled={!user || (isPending && !isSuccess)}
              >
                {isPending && isSuccess ? "Posting..." : "Post Comment"}
              </Button>
            ) : (
              <Button
                as={Link}
                className="mt-4"
                content="plese Login to comment"
                radius="none"
                size="sm"
                type="submit"
                variant="bordered"
                href={`/auth?redirect=/${post?._id}`}
              >
                {isPending && isSuccess ? "Posting..." : "Post Comment"}
              </Button>
            )}
          </CustomForm>
        </Card>
      </div>
    </>
  );
};

export default PostData;
