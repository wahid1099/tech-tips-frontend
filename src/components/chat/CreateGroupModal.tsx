"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { X } from "lucide-react";

import { useCreateGroupChat, useSearchUsers } from "@/src/hooks/Chat.hook";
import { TUser } from "@/src/types";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({
  isOpen,
  onClose,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);

  const { data: searchResults = [] } = useSearchUsers(searchQuery);
  const { mutate: createGroup, isPending } = useCreateGroupChat();

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedUsers.length === 0) return;

    createGroup({
      name: groupName.trim(),
      description: groupDescription.trim() || undefined,
      participants: selectedUsers.map((user) => user.email),
    });

    handleClose();
  };

  const handleClose = () => {
    setGroupName("");
    setGroupDescription("");
    setSearchQuery("");
    setSelectedUsers([]);
    onClose();
  };

  const addUser = (user: TUser) => {
    if (!selectedUsers.find((u) => u.email === user.email)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchQuery("");
  };

  const removeUser = (userEmail: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u.email !== userEmail));
  };

  const filteredResults = searchResults.filter(
    (user) => !selectedUsers.find((u) => u.email === user.email)
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalContent>
        <ModalHeader>Create New Group</ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="Group Name"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            isRequired
          />

          <Textarea
            label="Description (Optional)"
            placeholder="Enter group description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            minRows={2}
          />

          <div>
            <label className="text-sm font-medium mb-2 block">
              Add Members
            </label>
            <Autocomplete
              placeholder="Search users..."
              inputValue={searchQuery}
              onInputChange={setSearchQuery}
              items={filteredResults}
              onSelectionChange={(key) => {
                const user = filteredResults.find((u) => u.email === key);
                if (user) addUser(user);
              }}
            >
              {(user) => (
                <AutocompleteItem key={user.email} textValue={user.name}>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={user.profileImage}
                      name={user.name}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.userName}</p>
                    </div>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          {selectedUsers.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Selected Members ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <Chip
                    key={user.email}
                    onClose={() => removeUser(user.email)}
                    variant="flat"
                    avatar={
                      <Avatar
                        src={user.profileImage}
                        name={user.name}
                        size="sm"
                      />
                    }
                  >
                    {user.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleCreateGroup}
            isLoading={isPending}
            isDisabled={!groupName.trim() || selectedUsers.length === 0}
          >
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
