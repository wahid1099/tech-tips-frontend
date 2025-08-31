"use client";

import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";
import { MessageCircle, Users, Search } from "lucide-react";

import ChatList from "@/src/components/chat/ChatList";
import ChatWindow from "@/src/components/chat/ChatWindow";
import CreateGroupModal from "@/src/components/chat/CreateGroupModal";
import UserSearchModal from "@/src/components/chat/UserSearchModal";
import { useGetAllChats } from "@/src/hooks/Chat.hook";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: chatsData, isLoading } = useGetAllChats();

  const {
    isOpen: isCreateGroupOpen,
    onOpen: onCreateGroupOpen,
    onClose: onCreateGroupClose,
  } = useDisclosure();
  const {
    isOpen: isUserSearchOpen,
    onOpen: onUserSearchOpen,
    onClose: onUserSearchClose,
  } = useDisclosure();

  const directChats =
    chatsData?.chats?.filter((chat) => chat.type === "direct") || [];
  const groupChats =
    chatsData?.chats?.filter((chat) => chat.type === "group") || [];

  const filteredDirectChats = directChats.filter((chat) =>
    chat.participants.some(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredGroupChats = groupChats.filter((chat) =>
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex gap-6 h-[calc(100vh-120px)]">
        {/* Chat List Sidebar */}
        <Card className="w-80 flex-shrink-0">
          <CardBody className="p-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Messages</h2>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={onUserSearchOpen}
                  >
                    <MessageCircle size={18} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={onCreateGroupOpen}
                  >
                    <Users size={18} />
                  </Button>
                </div>
              </div>

              {/* Search */}
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search size={16} />}
                size="sm"
              />
            </div>

            {/* Chat Tabs */}
            <div className="flex-1 overflow-hidden">
              <Tabs
                fullWidth
                size="sm"
                classNames={{
                  tabList:
                    "gap-0 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-primary",
                  tab: "max-w-fit px-4 h-10",
                  tabContent: "group-data-[selected=true]:text-white",
                }}
              >
                <Tab key="direct" title="Direct">
                  <div className="h-full overflow-y-auto">
                    <ChatList
                      chats={filteredDirectChats}
                      selectedChatId={selectedChatId}
                      onChatSelect={setSelectedChatId}
                      isLoading={isLoading}
                    />
                  </div>
                </Tab>
                <Tab key="groups" title="Groups">
                  <div className="h-full overflow-y-auto">
                    <ChatList
                      chats={filteredGroupChats}
                      selectedChatId={selectedChatId}
                      onChatSelect={setSelectedChatId}
                      isLoading={isLoading}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </CardBody>
        </Card>

        {/* Chat Window */}
        <div className="flex-1">
          {selectedChatId ? (
            <ChatWindow chatId={selectedChatId} />
          ) : (
            <Card className="h-full">
              <CardBody className="flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle
                    size={64}
                    className="mx-auto mb-4 text-gray-400"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500">
                    Choose a chat from the sidebar to start messaging
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={onCreateGroupClose}
      />

      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={onUserSearchClose}
        onChatSelect={setSelectedChatId}
      />
    </div>
  );
}
