import { Skeleton } from "@nextui-org/react";

const Postskeleton = () => {
  return (
    <div className="flex justify-center pt-8">
      <div className="border border-gray-300 rounded-lg p-4 shadow-lg flex flex-col items-center w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl dark:bg-[#1A2B40] dark:border-gray-900">
        <div className="flex items-center w-full">
          <Skeleton className="rounded-full w-12 h-12" />
          <Skeleton className="ml-4 w-3/4 h-6" />
        </div>
        <div className="flex justify-around w-full mt-4">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Postskeleton;
