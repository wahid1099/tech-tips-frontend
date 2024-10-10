// Importing necessary components and utilities
import "@/src/styles/globals.css";
import { fontSans } from "@/src/config/font";

import { Navbar } from "@/src/components/Navbar/navbar";
import { Providers } from "@/src/context/Provider/Provider";
import { Metadata, Viewport } from "next";

import clsx from "clsx";
import CommonLayout from "@/src/app/(WithCommonLayout)/layout";

// Defining metadata for the application
export const metadata: Metadata = {
  title: {
    default: "Tech & Tips Hub",
    template: "%s | Tech & Tips Hub",
  },
  description: "Your one-stop shop for tech reviews and tech news.",
  icons: {
    icon: "../assets/favicons/favicon-32x32.png",
  },
};

// Defining viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Main Layout component
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Head content with meta tags and favicon links */}
        <title>Tech & Tips Hub</title>
        <meta
          name="description"
          content="Your one-stop shop for tech reviews and tech news."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../assets/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="../assets/favicons/site.webmanifest" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Wrapping the application with Providers for theme management */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* Using CommonLayout to structure the page */}
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
