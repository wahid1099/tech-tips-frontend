"use client";
import { motion } from "framer-motion";
import EditorModal from "@/src/components/posts/createpost";
import { useUser } from "@/src/context/UserContext";
import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import ModernMembershipBanner from "@/src/components/UI/MemberShip/ModernMembershipBanner";
import ModernPostsList from "@/src/components/posts/ModernPostsList";
import React, { Suspense } from "react";
import { CircularProgress } from "@nextui-org/react";
import Postskeleton from "@/src/components/posts/Postskeleton";

export default function Home() {
  const { user, isLoading } = useUser();

  // Display loading state if user data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CircularProgress size="lg" color="primary" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your personalized feed...
          </p>
        </motion.div>
      </div>
    );
  }

  // Handle case where user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-md mx-auto shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0">
            <CardBody className="p-8 text-center">
              <div className="text-6xl mb-6">🚀</div>
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Tech Tips Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Discover the latest tech insights, tutorials, and expert
                reviews. Join our community to unlock exclusive content!
              </p>
              <Link href="/auth">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                >
                  Get Started
                </Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Join thousands of tech enthusiasts
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6">
        <ModernMembershipBanner />
        <EditorModal />
        <Suspense fallback={<Postskeleton />}>
          <ModernPostsList />
        </Suspense>
      </div>
    </div>
  );
}
