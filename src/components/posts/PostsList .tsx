"use client";
import React, { useState } from "react";
import { useGetAllPosts } from "@/src/hooks/Post.hooks";
import { useUser } from "@/src/context/UserContext";
import PostCard from "./PostCard"; // Adjust path if necessary
import { TPost } from "@/src/types"; // Ensure the correct path to TPost
import Postskeleton from "./Postskeleton";

const PostsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const { data, error, isLoading } = useGetAllPosts({ searchQuery, category });
  const posts: TPost[] = data?.data || []; // Ensure posts are typed as TPost[]
  // console.log("data", posts);

  if (isLoading) return <Postskeleton />;
  if (error) return <p>Failed to load posts</p>;

  return (
    <div className="container mx-auto px-4 ">
      {posts.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 ">
          {posts.map((post: TPost) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostsList;
