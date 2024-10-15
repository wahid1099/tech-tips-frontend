"use client";
import { Card, Skeleton } from "@nextui-org/react";
import { useUser } from "@/src/context/UserContext";
import { useGetMyPosts } from "@/src/hooks/Post.hooks";
import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import { User, TPost } from "@/src/types";

const MyPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const { user, isLoading } = useUser();
  const { data, error } = useGetMyPosts({ searchQuery, category });
  // Example posts data (replace with actual posts API)
  const posts = data?.data || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: TPost) => (
          <Card key={post._id} className="p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
