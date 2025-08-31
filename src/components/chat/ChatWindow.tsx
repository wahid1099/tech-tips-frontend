"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Skeleton } from "@nextui-org/skeleton";
import { useDisclosure } from "@nextui-org/modal";
import {
  Send,
  MoreVertical,
  Users,
  UserPlus,
  Settings,
  LogOut,
} from "lucide-react";

import MessageBubble from "./MessageBubble";
import GroupSettingsModal from "./GroupSettingsModal";
import TypingIndicator from "./TypingIndicator";
import {
  useGetChatMessages,
  useSendMessage,
  useMarkMessagesAsRead,
} from "@/src/hooks/Chat.hook";
import { useGetAllChats } from "@/src/hooks/Chat.hook";
import { useUser } from "@/src/context/UserContext";
import { useChat } from "@/src/context/ChatContext";

interface ChatWindowProps {
  chatId: string;
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { typingUsers, sendTyping, stopTyping } = useChat();
  const {
    isOpen: isGroupSettingsOpen,
    onOpen: onGroupSettingsOpen,
    onClose: onGroupSettingsClose,
  } = useDisclosure();

  const { data: chatsData } = useGetAllChats();
  const { data: messagesData, isLoading: messagesLoading } =
    useGetChatMessages(chatId);
  const { mutate: sendMessage, isPending: sendingMessage } = useSendMessage();
  const { mutate: markAsRead } = useMarkMessagesAsRead();

  const currentChat = chatsData?.chats?.find((chat) => chat._id === chatId);
  const messages = messagesData?.messages || [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Mark messages as read when chat is opened
    if (chatId) {
      markAsRead(chatId);
    }
  }, [chatId, markAsRead]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    sendMessage({
      chatId,
      content: message.trim(),
      messageType: "text",
    });

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getChatName = () => {
    if (!currentChat) return "Loading...";

    if (currentChat.type === "group") {
      return currentChat.name || "Unnamed Group";
    }

    const otherParticipant = currentChat.participants.find(
      (p) => p.email !== user?.email
    );
    return otherParticipant?.name || "Unknown User";
  };

  const getChatAvatar = () => {
    if (!currentChat) return undefined;

    if (currentChat.type === "group") {
      return undefined;
    }

    const otherParticipant = currentChat.participants.find(
      (p) => p.email !== user?.email
    );
    return otherParticipant?.profileImage || undefined;
  };

  const getOnlineStatus = () => {
    if (!currentChat || currentChat.type === "group") return null;

    // This would typically come from a real-time connection
    return "Online"; // Placeholder
  };

  if (!currentChat) {
    return (
      <Card className="h-full">
        <CardBody className="flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Chat Header */}
      <CardHeader className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {currentChat.type === "group" ? (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
          ) : (
            <Avatar src={getChatAvatar()} name={getChatName()} size="sm" />
          )}

          <div>
            <h3 className="font-semibold">{getChatName()}</h3>
            {currentChat.type === "group" ? (
              <p className="text-sm text-gray-500">
                {currentChat.participants.length} members
              </p>
            ) : (
              <p className="text-sm text-gray-500">{getOnlineStatus()}</p>
            )}
          </div>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="sm">
              <MoreVertical size={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {currentChat.type === "group" ? (
              <DropdownItem
                key="group-settings"
                startContent={<Settings size={16} />}
                onPress={onGroupSettingsOpen}
              >
                Group Settings
              </DropdownItem>
            ) : (
              <DropdownItem key="placeholder" className="hidden">
                Placeholder
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </CardHeader>

      {/* Messages Area */}
      <CardBody className="flex-1 overflow-y-auto p-4">
        {messagesLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex gap-2 max-w-xs ${i % 2 === 0 ? "" : "flex-row-reverse"}`}
                >
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <Skeleton className="h-12 flex-1 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id}
                message={msg}
                isOwn={msg.sender.email === user?.email}
                showAvatar={currentChat.type === "group"}
              />
            ))}

            {/* Typing Indicator */}
            <TypingIndicator
              typingUsers={typingUsers[chatId] || []}
              showAvatar={currentChat.type === "group"}
            />

            <div ref={messagesEndRef} />
          </div>
        )}
      </CardBody>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.trim()) {
                sendTyping(chatId);
              } else {
                stopTyping(chatId);
              }
            }}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={sendingMessage}
          />
          <Button
            isIconOnly
            color="primary"
            onPress={handleSendMessage}
            isLoading={sendingMessage}
            disabled={!message.trim() || sendingMessage}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Group Settings Modal */}
      {currentChat?.type === "group" && (
        <GroupSettingsModal
          isOpen={isGroupSettingsOpen}
          onClose={onGroupSettingsClose}
          chat={currentChat}
        />
      )}
    </Card>
  );
}
