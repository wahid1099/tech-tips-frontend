"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { LuSunMoon, LuMoonStar } from "react-icons/lu";

// Define the props for the ThemeSwitch component
export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

// ThemeSwitch component definition
export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  // Use the useTheme hook to access theme-related functions and state
  const { theme, setTheme, resolvedTheme } = useTheme();
  // Check if the component is being rendered on the server side
  const isSSR = useIsSSR();

  // Function to handle theme change
  const onChange = () => {
    const nextTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  // Use the useSwitch hook to handle switch functionality
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: resolvedTheme === "dark",
    "aria-label": `Switch to ${
      resolvedTheme === "light" ? "dark" : "light"
    } mode`,
    onChange,
  });

  // Render the theme switch component
  // Render the theme switch component
  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      {/* Hidden input for accessibility */}
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* Wrapper for the switch icon */}
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent", // Ensure background is transparent
              "rounded-lg",
              "flex items-center justify-center",
              "!text-default-500",
              "pt-px px-0 mx-0",
            ],
            classNames?.wrapper
          ),
        })}
        style={{ backgroundColor: "transparent" }} // Force background to be transparent
      >
        {/* Render appropriate icon based on the current theme */}
        {resolvedTheme === "dark" ? (
          <LuSunMoon size={22} />
        ) : (
          <LuMoonStar size={22} />
        )}
      </div>
    </Component>
  );
};
