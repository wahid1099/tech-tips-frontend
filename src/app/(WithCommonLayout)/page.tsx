"use client";
import Image from "next/image";
import EditorModal from "@/src/components/posts/createpost";
import { useUser } from "@/src/context/UserContext";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <EditorModal />
    </div>
  );
}
