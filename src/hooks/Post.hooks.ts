import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  editComment,
  getLowestLikedPosts,
  getMostLikedPosts,
  getMyPosts,
  updatePost,
  votePost,
} from "@/src/services/PostServices/PostServices";
import { TCreatePost, TUpdatePost } from "@/src/types/index";

export const usePostComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["post-comment"],
    mutationFn: async ({ postId, comment }) =>
      await createComment(postId, comment),
    onError: () => {
      toast.error("Failed to post comment!");
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ["delete-comment"],
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => await deleteComment(postId, commentId),
    onError: () => {
      toast.error("Failed to delete comment!");
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationKey: ["edit-comment"],
    mutationFn: async ({
      postId,
      commentId,
      comment,
    }: {
      postId: string;
      commentId: string;
      comment: { content: string };
    }) => await editComment(postId, commentId, comment),
    onError: () => {
      toast.error("Failed to edit comment!");
    },
  });
};

// export const useGetAllPosts = ({ searchQuery, category }) => {
//   return useQuery({
//     queryKey: ["all-posts", { searchQuery, category }],
//     queryFn: async () => await getAllPosts({ searchQuery, category }),
//   });
// };

export const useGetMostLikedPosts = () => {
  return useQuery({
    queryKey: ["most-liked-posts"],
    queryFn: async () => await getMostLikedPosts(),
  });
};

export const useGetLowestLikedPosts = ({ searchQuery = "", category = "" }) => {
  return useQuery({
    queryKey: ["lowest-liked-posts", { searchQuery, category }],
    queryFn: async () => await getLowestLikedPosts({ searchQuery, category }),
  });
};

export const useVotePost = () => {
  return useMutation<any, Error, { postId: string; action: string }>({
    mutationKey: ["vote-post"],
    mutationFn: async ({ postId, action }) => await votePost(postId, action),
    onError: () => {
      toast.error("Failed to vote post!");
    },
  });
};
export const useGetMyPosts = ({ searchQuery = "", category = "" }) => {
  return useQuery({
    queryKey: ["my-posts", { searchQuery, category }],
    queryFn: async () => await getMyPosts({ searchQuery, category }),
  });
};

// export const useDeletedPost = () => {
//   const QueryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["delete-post"],
//     mutationFn: async (postId: string) => await deletePost(postId),
//     onSuccess: () => {
//       QueryClient.invalidateQueries({ queryKey: ["all-posts"] });
//       toast.success("Post deleted successfully.");
//     },
//     onError: () => {
//       toast.error("Failed to delete post. Please try again later.");
//     },
//   });
// };

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (postData: TCreatePost) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully!", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: async ({
      id,
      postData,
    }: {
      id: string;
      postData: TUpdatePost;
    }) => await updatePost(id, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      toast.success("Post updated successfully!", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-post"],
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      toast.success("Post deleted successfully!", { position: "top-center" });
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};
