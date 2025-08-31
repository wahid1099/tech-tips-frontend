"use client";
import React, { useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Button,
  Chip,
} from "@nextui-org/react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownItems } from "@/src/types/index";

interface ModernSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  filterType: string;
  setFilterType: (filter: string) => void;
}

const ModernSearchFilter: React.FC<ModernSearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  filterType,
  setFilterType,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = [
    { key: "all", label: "All Posts" },
    { key: "highest", label: "Most Liked" },
    { key: "lowest", label: "Least Liked" },
    { key: "recent", label: "Most Recent" },
    { key: "trending", label: "Trending" },
  ];

  const clearAllFilters = () => {
    setSearchQuery("");
    setCategory("");
    setFilterType("all");
    setActiveFilters([]);
  };

  const hasActiveFilters = searchQuery || category || filterType !== "all";

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      {/* Main Search Bar */}
      <Card className="shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0">
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search for tech tips, tutorials, reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<FaSearch className="text-gray-400" />}
                size="lg"
                variant="flat"
                classNames={{
                  input: "text-sm",
                  inputWrapper:
                    "bg-gray-50 dark:bg-gray-700/50 border-0 hover:bg-gray-100 dark:hover:bg-gray-700",
                }}
              />
            </div>

            <Button
              isIconOnly
              variant={isFilterOpen ? "solid" : "flat"}
              color={isFilterOpen ? "primary" : "default"}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="shrink-0"
            >
              <FaFilter />
            </Button>

            {hasActiveFilters && (
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onClick={clearAllFilters}
                className="shrink-0"
              >
                <FaTimes />
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0">
              <CardBody className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <Select
                      placeholder="Select category"
                      selectedKeys={category ? [category] : []}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setCategory(selectedKey || "");
                      }}
                      variant="flat"
                      classNames={{
                        trigger:
                          "bg-gray-50 dark:bg-gray-700/50 border-0 hover:bg-gray-100 dark:hover:bg-gray-700",
                      }}
                      items={[
                        { key: "", label: "All Categories" },
                        ...dropdownItems,
                      ]}
                    >
                      {(item) => (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      )}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <Select
                      placeholder="Sort posts"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      variant="flat"
                      classNames={{
                        trigger:
                          "bg-gray-50 dark:bg-gray-700/50 border-0 hover:bg-gray-100 dark:hover:bg-gray-700",
                      }}
                    >
                      {filterOptions.map((option) => (
                        <SelectItem key={option.key} value={option.key}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 flex-wrap"
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Active filters:
          </span>

          {searchQuery && (
            <Chip
              size="sm"
              variant="flat"
              color="primary"
              onClose={() => setSearchQuery("")}
            >
              Search: "{searchQuery}"
            </Chip>
          )}

          {category && (
            <Chip
              size="sm"
              variant="flat"
              color="secondary"
              onClose={() => setCategory("")}
            >
              Category:{" "}
              {dropdownItems.find((item) => item.key === category)?.label}
            </Chip>
          )}

          {filterType !== "all" && (
            <Chip
              size="sm"
              variant="flat"
              color="success"
              onClose={() => setFilterType("all")}
            >
              Sort:{" "}
              {filterOptions.find((option) => option.key === filterType)?.label}
            </Chip>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ModernSearchFilter;
