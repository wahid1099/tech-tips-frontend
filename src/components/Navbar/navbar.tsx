"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import Logo from "@/src/assets/logo.png";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "@/src/services/UserServices/AuthServices";
import { useUser } from "@/src/context/UserContext";
import { protectedRoutes } from "@/src/config/Constatns";
import { NavbarItems } from "@/src/components/Navbar/NavItems";
import { ThemeSwitch } from "@/src/components/Themeswticher";

export const Navbar = () => {
  const router = useRouter();
  const { user, setUser, isSetLoading: UserLoading } = useUser();

  const pathname = usePathname();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogOut = async () => {
    UserLoading(true); // Set loading to true
    try {
      await logOut();
      setUser(null); // Clear the user data from context
      // Ensure the logout function is awaited if it's asynchronous
      // Perform any additional actions after logout here if needed
    } catch (error) {
      console.error("Logout error:", error); // Handle logout error if needed
    } finally {
      UserLoading(false); // Ensure loading is set to false after logout
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/"); // Redirect to home
      }
    }
  };

  return (
    <NextUINavbar
      className="shadow-lg light:bg-[#F9F9F9] dark:bg-gray-900"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-1" href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={150}
              height={50} // adjust size as needed
            />
            {/* <p className="font-bold text-inherit uppercase">
              Tech <span className="text-pink-500">Hub</span>
            </p> */}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex gap-4 justify-center ml-2 uppercase font-bold"
        justify="center"
      >
        {NavbarItems.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium hover:text-pink-500 transition-colors"
              )}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full justify-end"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {user?.email ? (
          <NavbarItem className="hidden md:flex">
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center cursor-pointer">
                  <Avatar src={user?.profileImage} size="sm" />
                  <span className="ml-2 mr-2">{user?.userName}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Example with disabled actions">
                <DropdownItem
                  key="dashboard"
                  onClick={() =>
                    handleNavigation(
                      user?.role === "admin" ? "/admin" : "/profile"
                    )
                  }
                >
                  {user?.role === "admin" ? "Admin Dashboard" : "Profile"}
                </DropdownItem>

                <DropdownItem key="logout" onClick={handleLogOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden md:flex">
            <Link className="border px-4 py-1" href="/auth">
              Log In
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle className="text-black dark:text-white" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {NavbarItems.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === NavbarItems.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
