import Sidebar from "@/src/components/UI/sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <div className="md:w-64 w-full min-h-screen md:min-h-full bg-gray-800 md:sticky md:top-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
