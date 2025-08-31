"use client";

import { Badge } from "@nextui-org/badge";
import { MessageCircle } from "lucide-react";
import { useGetAllChats } from "@/src/hooks/Chat.hook";

export default function ChatNotification() {
  const { data: chatsData } = useGetAllChats();

  const totalUnreadCount =
    chatsData?.chats?.reduce((total, chat) => total + chat.unreadCount, 0) || 0;

  if (totalUnreadCount === 0) {
    return <MessageCircle size={20} />;
  }

  return (
    <Badge
      content={totalUnreadCount > 99 ? "99+" : totalUnreadCount}
      color="danger"
      size="sm"
    >
      <MessageCircle size={20} />
    </Badge>
  );
}
