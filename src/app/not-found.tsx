import Link from "next/link";
import { Button } from "@nextui-org/button";

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png')",
      }}
    >
      <div className="text-center p-10 bg-black bg-opacity-60 rounded-lg">
        <p className="mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" legacyBehavior>
          <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Go Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
