"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserProvider from "@/src/context/UserContext";
import { ChatProvider } from "@/src/context/ChatContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChatProvider>
          <NextUIProvider navigate={router.push}>
            <Toaster />
            <ThemeProvider {...themeProps}>{children}</ThemeProvider>
          </NextUIProvider>
        </ChatProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
