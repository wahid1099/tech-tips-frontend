import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { TPost, Pagination } from "@/src/types";
import Postskeleton from "./Postskeleton";
import { dropdownItems } from "@/src/types/index"; // Adjust the path as necessary
import {
  getAllPosts,
  getMostLikedPosts,
  getLowestLikedPosts,
} from "@/src/services/PostServices/PostServices"; // Import necessary services
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@nextui-org/spinner";

const PostsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filterType, setFilterType] = useState("all"); // New state for filter type
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let data: TPost[] = [];
      let pagination: Pagination | undefined;

      // Handle different filter types
      if (filterType === "highest") {
        const response = await getMostLikedPosts();
        data = response.data.mostLikedPosts || [];
        pagination = response.pagination;
      } else if (filterType === "lowest") {
        const response = await getLowestLikedPosts({
          searchQuery,
          category,
        });
        data = response.data.lowestLikedPosts || [];
        pagination = response.pagination;
      } else {
        // Default case: fetch all posts
        const response = await getAllPosts({
          searchQuery,
          category,
          page: currentPage,
          limit: 5,
        });
        data = response.data || [];
        pagination = response.pagination;
      }

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setTotalPosts(pagination?.totalPosts || 0);
      setHasMore(pagination?.hasMore || false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]); // Reset posts
    setCurrentPage(1); // Reset current page
    fetchPosts(); // Fetch posts when filter, search query, or category changes
  }, [searchQuery, category, filterType]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchPosts();
    }
  }, [currentPage]); // Fetch more posts on page change

  if (loading && posts.length === 0) return <Postskeleton />;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2 lg:w-1/3 mb-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2 lg:w-1/3"
        >
          <option value="">All Categories</option>
          {dropdownItems.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Filter selection for "highest" and "lowest" */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2 lg:w-1/3"
        >
          <option value="all">All Posts</option>
          <option value="highest">Highest Liked Posts</option>
          <option value="lowest">Lowest Liked Posts</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={posts.length}
        next={() => setCurrentPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<Spinner />}
        style={{ overflow: "hidden" }}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p>No posts found</p>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default PostsList;
