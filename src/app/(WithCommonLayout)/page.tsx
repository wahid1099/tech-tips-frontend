"use client";
import Image from "next/image";
import EditorModal from "@/src/components/posts/createpost";
import { useUser } from "@/src/context/UserContext";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import MemberShip from "@/src/components/UI/MemberShip/MembershipBanner";
import PostCard from "@/src/components/posts/PostCard";
import PostsList from "@/src/components/posts/PostsList ";
import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@nextui-org/react";
import Postskeleton from "@/src/components/posts/Postskeleton";
export default function Home() {
  const { user, isLoading } = useUser();

  // Display loading state if user data is loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress color="primary" />
        <p className="mt-4">Loading user data...</p>
      </div>
    );
  }

  // Handle case where user is not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg mb-6">
          You need to be logged in to post and view posts.
        </p>
        <Link href="/auth">
          <Button color="primary" className="bg-blue-500 dark:bg-blue-700">
            Log In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <MemberShip />
      <EditorModal />
      <Suspense fallback={<Postskeleton />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
