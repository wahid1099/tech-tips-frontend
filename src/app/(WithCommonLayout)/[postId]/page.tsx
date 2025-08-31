import React from "react";

import ModernPostDetails from "@/src/components/posts/ModernPostDetails";
import { getPostById } from "@/src/services/PostServices/PostServices";

interface PostProps {
  params: {
    postId: string;
  };
}

const PostDetails = async ({ params: { postId } }: PostProps) => {
  const { data } = await getPostById(postId);

  return <ModernPostDetails post={data} />;
};

export default PostDetails;
