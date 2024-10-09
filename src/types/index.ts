import { ReactNode } from "react";

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
  images: string[];
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
