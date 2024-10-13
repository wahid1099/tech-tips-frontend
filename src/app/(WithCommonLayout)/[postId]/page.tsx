import React from "react";

import PostData from "@/src/components/posts/PostDetails";
import { getPostById } from "@/src/services/PostServices/PostServices";

interface PostProps {
  params: {
    postId: string;
  };
}
const PostDetails = async ({ params: { postId } }: PostProps) => {
  const { data } = await getPostById(postId);

  return (
    <>
      <PostData post={data} />
    </>
  );
};

export default PostDetails;
