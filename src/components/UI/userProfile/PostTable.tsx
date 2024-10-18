"use client";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { debounce } from "lodash";

import TechModal from "../Modals/TechModal";
// import CreatePost from "@/src/components/UI/userProfile/CreatePost";
import { Skeleton } from "@nextui-org/react";

import { columns } from "./Postcontent";
import MyPostCell from "./MyPostCells";

import { useGetMyPosts } from "@/src/hooks/Post.hooks";
import { User, TPost } from "@/src/types";
import { categories } from "@/src/config/Constatns";
import { useUser } from "@/src/context/UserContext";
export default function MyPostTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const { data, error, isLoading } = useGetMyPosts({ searchQuery, category });
  const { user } = useUser();

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-danger">
        Error fetching posts: {error.message}
      </div>
    );
  }

  const posts = data?.data || [];

  return (
    <div className="md:px-6 px-2">
      <div className="border mt-4">
        <div className="max-w-6xl  mx-auto px-4 py-10">
          <h1 className="text-center text-3xl font-bold mb-2">
            My Published <span className="text-pink-500">Posts</span>
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Review and manage your published posts, track their performance, and
            make updates when needed.
          </p>

          {/* Search, Categories, and Create Post button */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="w-full sm:w-auto flex-grow sm:mr-4">
              <Input
                fullWidth
                placeholder="Search posts..."
                radius="none"
                size="lg"
                variant="bordered"
                onChange={handleSearch}
              />
            </div>
            <div className="w-full sm:w-auto flex-grow sm:mr-4">
              <Select
                items={categories}
                placeholder="All Categories"
                radius="none"
                size="lg"
                variant="bordered"
                onChange={(e) => setCategory(e.target.value)}
              >
                {(category) => (
                  <SelectItem key={category?.key} variant="bordered">
                    {category?.label}
                  </SelectItem>
                )}
              </Select>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <Divider className="my-6 " />
      {posts.length > 0 ? (
        <Table aria-label="Manage Users Table" className="mt-10">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={posts}>
            {(post: TPost) => (
              <TableRow key={post.id || Math.random()}>
                {(columns) => (
                  <TableCell>
                    <MyPostCell columnKey={columns as string} post={post} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center mt-4 text-pink-500">
          <b>
            No posts to show at the moment. Why not create your first post and
            share your ideas?
          </b>{" "}
          {/* Updated message */}
        </div>
      )}
    </div>
  );
}
