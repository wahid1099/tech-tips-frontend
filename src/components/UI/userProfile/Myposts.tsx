"use client";
import { Card, Skeleton } from "@nextui-org/react";
import { useUser } from "@/src/context/UserContext";

const MyPosts = () => {
  const { user, isLoading } = useUser();

  // Example posts data (replace with actual posts API)
  const posts = [
    { id: 1, title: "Post 1", content: "This is the first post." },
    { id: 2, title: "Post 2", content: "This is the second post." },
  ];

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
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
