import { Navbar } from "@/components/Navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
