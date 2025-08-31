"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "./UserContext";
import { TMessage, TChat } from "../types";

interface ChatContextType {
  onlineUsers: string[];
  isConnected: boolean;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  sendTyping: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
  typingUsers: Record<string, string[]>; // chatId -> array of user names
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (user?.email) {
      // Initialize socket connection here
      // This is a placeholder - you'll need to implement actual socket connection
      // const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      //   auth: {
      //     token: localStorage.getItem('token')
      //   }
      // });

      // socketInstance.on('connect', () => {
      //   setIsConnected(true);
      // });

      // socketInstance.on('disconnect', () => {
      //   setIsConnected(false);
      // });

      // socketInstance.on('onlineUsers', (users: string[]) => {
      //   setOnlineUsers(users);
      // });

      // socketInstance.on('userTyping', ({ chatId, userName }: { chatId: string; userName: string }) => {
      //   setTypingUsers(prev => ({
      //     ...prev,
      //     [chatId]: [...(prev[chatId] || []), userName]
      //   }));
      // });

      // socketInstance.on('userStoppedTyping', ({ chatId, userName }: { chatId: string; userName: string }) => {
      //   setTypingUsers(prev => ({
      //     ...prev,
      //     [chatId]: (prev[chatId] || []).filter(name => name !== userName)
      //   }));
      // });

      // setSocket(socketInstance);

      // return () => {
      //   socketInstance.disconnect();
      // };

      // For now, simulate connection
      setIsConnected(true);
    }
  }, [user]);

  const joinChat = (chatId: string) => {
    if (socket) {
      socket.emit("joinChat", chatId);
    }
  };

  const leaveChat = (chatId: string) => {
    if (socket) {
      socket.emit("leaveChat", chatId);
    }
  };

  const sendTyping = (chatId: string) => {
    if (socket) {
      socket.emit("typing", { chatId });
    }
  };

  const stopTyping = (chatId: string) => {
    if (socket) {
      socket.emit("stopTyping", { chatId });
    }
  };

  const value = {
    onlineUsers,
    isConnected,
    joinChat,
    leaveChat,
    sendTyping,
    stopTyping,
    typingUsers,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
