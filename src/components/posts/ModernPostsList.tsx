import React, { useState, useEffect } from "react";
import ModernPostCard from "./ModernPostCard";
import { TPost, Pagination } from "@/src/types";
import Postskeleton from "./Postskeleton";
import ModernSearchFilter from "@/src/components/UI/ModernSearchFilter";
import {
  getAllPosts,
  getMostLikedPosts,
  getLowestLikedPosts,
} from "@/src/services/PostServices/PostServices";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { debounce } from "lodash";

const ModernPostsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedFetchPosts = debounce(() => fetchPosts(), 500);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let data: TPost[] = [];
      let pagination: Pagination | undefined;

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
    setPosts([]);
    setCurrentPage(1);
    debouncedFetchPosts();
  }, [searchQuery, category, filterType]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchPosts();
    }
  }, [currentPage]);

  if (loading && posts.length === 0) return <Postskeleton />;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Modern Search and Filter */}
      <ModernSearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {/* Posts Results Header */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {searchQuery
                      ? `Search results for "${searchQuery}"`
                      : "Latest Posts"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {totalPosts} {totalPosts === 1 ? "post" : "posts"} found
                  </p>
                </div>
                {filterType !== "all" && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sorted by:{" "}
                    {filterType === "highest"
                      ? "Most Liked"
                      : filterType === "lowest"
                        ? "Least Liked"
                        : filterType}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* Posts List */}
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setCurrentPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-8">
            <Spinner size="lg" color="primary" />
          </div>
        }
        style={{ overflow: "hidden" }}
        endMessage={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 max-w-md mx-auto">
              <CardBody className="p-6">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  You've reached the end!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You've seen all the amazing content we have. Check back later
                  for more!
                </p>
              </CardBody>
            </Card>
          </motion.div>
        }
      >
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ModernPostCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 max-w-md mx-auto">
              <CardBody className="p-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We couldn't find any posts matching your criteria. Try
                  adjusting your search or filters.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {searchQuery && <p>Search term: "{searchQuery}"</p>}
                  {category && <p>Category: {category}</p>}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ModernPostsList;
