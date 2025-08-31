"use client";

import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Skeleton } from "@nextui-org/skeleton";
import { Users } from "lucide-react";
import { TChat } from "@/src/types";
import { useUser } from "@/src/context/UserContext";

interface ChatListProps {
  chats: TChat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  isLoading: boolean;
}

export default function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
  isLoading,
}: ChatListProps) {
  const { user } = useUser();

  if (isLoading) {
    return (
      <div className="p-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 mb-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Users size={32} className="mx-auto mb-2 opacity-50" />
        <p>No conversations yet</p>
      </div>
    );
  }

  const getChatName = (chat: TChat) => {
    if (chat.type === "group") {
      return chat.name || "Unnamed Group";
    }

    // For direct chats, show the other participant's name
    const otherParticipant = chat.participants.find(
      (p) => p.email !== user?.email
    );
    return otherParticipant?.name || "Unknown User";
  };

  const getChatAvatar = (chat: TChat) => {
    if (chat.type === "group") {
      return undefined; // Will show default group icon
    }

    const otherParticipant = chat.participants.find(
      (p) => p.email !== user?.email
    );
    return otherParticipant?.profileImage || undefined;
  };

  const formatLastMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="p-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
            selectedChatId === chat._id
              ? "bg-primary/10 border border-primary/20"
              : ""
          }`}
          onClick={() => onChatSelect(chat._id)}
        >
          <div className="relative">
            {chat.type === "group" ? (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
            ) : (
              <Avatar
                src={getChatAvatar(chat)}
                name={getChatName(chat)}
                size="sm"
              />
            )}

            {chat.unreadCount > 0 && (
              <Badge
                content={chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                color="primary"
                size="sm"
                className="absolute -top-1 -right-1"
              >
                <span></span>
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm truncate">
                {getChatName(chat)}
              </h4>
              {chat.lastMessage && (
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatLastMessageTime(chat.lastMessage.createdAt)}
                </span>
              )}
            </div>

            {chat.lastMessage && (
              <p className="text-xs text-gray-500 truncate">
                {chat.type === "group" &&
                  chat.lastMessage.sender.email !== user?.email && (
                    <span className="font-medium">
                      {chat.lastMessage.sender.name}:{" "}
                    </span>
                  )}
                {chat.lastMessage.messageType === "text"
                  ? chat.lastMessage.content
                  : chat.lastMessage.messageType === "image"
                    ? "📷 Image"
                    : "📎 File"}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
