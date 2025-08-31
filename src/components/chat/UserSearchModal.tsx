"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { Search, MessageCircle } from "lucide-react";

import { useSearchUsers, useCreateDirectChat } from "@/src/hooks/Chat.hook";

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChatSelect: (chatId: string) => void;
}

export default function UserSearchModal({
  isOpen,
  onClose,
  onChatSelect,
}: UserSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults = [], isLoading } = useSearchUsers(searchQuery);
  const { mutate: createDirectChat, isPending } = useCreateDirectChat();

  const handleStartChat = (userId: string) => {
    createDirectChat(userId, {
      onSuccess: (chat) => {
        onChatSelect(chat._id);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalContent>
        <ModalHeader>Start New Conversation</ModalHeader>
        <ModalBody className="pb-6">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search size={16} />}
            autoFocus
          />

          <div className="mt-4 max-h-96 overflow-y-auto">
            {isLoading && searchQuery.length > 2 ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((user) => (
                  <div
                    key={user.email}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.profileImage}
                        name={user.name}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">
                          @{user.userName}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="light"
                      isIconOnly
                      onPress={() => handleStartChat(user.email)}
                      isLoading={isPending}
                    >
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : searchQuery.length > 2 ? (
              <div className="text-center py-8 text-gray-500">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p>No users found</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p>Search for users to start a conversation</p>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
