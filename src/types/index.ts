import { ReactNode, SVGProps } from "react";

export type TconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  birthDate: string;
  isVerified: boolean;
  profileImage: string;
  followers: any[];
  following: any[];
  payments: any[];
  bio: string;
  address: string;
  isDeleted: boolean;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  profession: string;
  __v: number;
  userName: string;
}

export interface TUser {
  name: string;
  email: string;
  role: string;
  profileImage: string;
  userName: string;
}
export interface TPost {
  _id: string;
  title: string;
  description: string;
  author: TAuthor;
  category: string;
  tags: string[];
  isPremium: boolean;
  upVotes: string[];
  downVotes: string[];
  comments: any[];
  thumbnailImage: string;
  status: string;
  pdfVersion: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: any;
}
export interface PostProps {
  posts: TPost[];
  heroLoading: boolean;
  layoutLoading: boolean;
  topLoading: boolean;
  postLoading: boolean;
}

export interface TAuthor {
  _id: string;
  name: string;
  email: string;
  profession: string;
  role: string;
  gender: string;
  birthDate: string;
  isVerified: boolean;
  profileImage: string;
  followers: any[];
  following: any[];
  payments: any[];
  bio: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userName: string;
  __v: number;
}

export interface TInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: ReactNode;
  name: string;
  disabled?: boolean;
}

export default interface TCreatePost {
  title: string;
  description: string;
  category: string;
  tags: string[];
  contents: string; // Ensure this is correctly defined
  author: string;
  isPremium: boolean;
  thumbnailImage?: string | null; // Allow null or undefined values
}

export interface TUpdatePost {
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  pdfVersion?: string;
  isPremium?: boolean;
  author?: string;
}

export const dropdownItems = [
  { key: "Web", label: "Web" },
  { key: "Android", label: "Android" },
  { key: "Software Engineering", label: "Software Engineering" },
  { key: "VR", label: "VR" },
  { key: "Mobile", label: "Mobile" },
  { key: "Macbook", label: "Macbook" },
  { key: "Gaming", label: "Gaming" },
  { key: "Artificial Intelligence", label: "Artificial Intelligence" },
  { key: "Blockchain", label: "Blockchain" },
  { key: "Cybersecurity", label: "Cybersecurity" },
  { key: "Data Science", label: "Data Science" },
  { key: "Machine Learning", label: "Machine Learning" },
  { key: "Natural Language Processing", label: "Natural Language Processing" },
  { key: "Cloud Computing", label: "Cloud Computing" },
  { key: "Quantum Computing", label: "Quantum Computing" },
  { key: "Quantum Cryptography", label: "Quantum Cryptography" },
  {
    key: "Artificial General Intelligence",
    label: "Artificial General Intelligence",
  },
  { key: "Others", label: "Others" },
];

export default interface GetAllPostsParams {
  searchQuery?: string;
  limit?: number;
  page?: number;
}
export interface Pagination {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}
export interface PostResponse {
  success: boolean;
  statuscode: number;
  message: string;
  data: TPost[];
  pagination: Pagination;
}
