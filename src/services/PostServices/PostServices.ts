"use server";
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/services/Axios/AxiosInstences";
import { envConfig } from "@/src/config/index";
import { TCreatePost, TUpdatePost } from "@/src/types/index";

// export const getAllPosts = async ({ searchQuery, category }) => {
//   const params = {};

//   console.log(params);

//   if (searchQuery) {
//     params.searchQuery = searchQuery;
//   }

//   if (category) {
//     params.category = category;
//   }

//   const res = await axiosInstance.get("/post", { params });

//   return res.data;
// };

export const getMostLikedPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/post/most-liked");

    if (data?.success) {
      revalidateTag("post");
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLowestLikedPosts = async ({
  searchQuery = "",
  category = "",
}) => {
  try {
    const { data } = await axiosInstance.get("/post/lowest-liked", {
      params: { searchQuery, category },
    });

    if (data?.success) {
      revalidateTag("post");
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPostById = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
    next: {
      tags: ["post"],
    },
  };
  const res = await fetch(`${envConfig.baseApi}/post/${postId}`, fetchOptions);

  const data = await res.json();

  return data;
};

export const createComment = async (
  postId: string,
  commentData: { user: string; content: string }
) => {
  try {
    const { data } = await axiosInstance.post(
      `/post/post-comment/${postId}`,
      commentData
    );

    revalidateTag("post");

    return data;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
};

export const editComment = async (
  postId: string,
  commentId: string,
  newComment: { content: string }
) => {
  try {
    const { data } = await axiosInstance.put(
      `/post/update-comment/${postId}/${commentId}`,
      newComment
    );

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error) {
    throw new Error("Failed to edit comment");
  }
};

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/post/delete-comment/${postId}/${commentId}`
    );

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const votePost = async (postId: string, action: string) => {
  try {
    const { data } = await axiosInstance.put(`/post/${postId}/vote`, {
      action,
    });

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyPosts = async ({ searchQuery = "", category = "" }) => {
  try {
    const { data } = await axiosInstance.get("/post/my-posts", {
      params: { searchQuery, category },
    });

    if (data?.success) {
      revalidateTag("post");
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createPost = async (postData: TCreatePost) => {
  try {
    const { data } = await axiosInstance.post("/post/create-post", postData);

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error);
  }
};

export const updatePost = async (postId: string, postData: TUpdatePost) => {
  try {
    const { data } = await axiosInstance.put(`/post/${postId}`, postData);

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/post/${postId}`);

    if (data?.success) {
      return data;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
