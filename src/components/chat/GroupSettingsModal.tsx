"use client";

import { useState, useEffect } from "react";
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
import { Tabs, Tab } from "@nextui-org/tabs";
import { UserMinus, Crown, UserPlus } from "lucide-react";

import {
  useUpdateGroupChat,
  useAddParticipants,
  useRemoveParticipant,
  useLeaveGroup,
  useSearchUsers,
} from "@/src/hooks/Chat.hook";
import { TChat, TUser } from "@/src/types";
import { useUser } from "@/src/context/UserContext";

interface GroupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chat: TChat;
}

export default function GroupSettingsModal({
  isOpen,
  onClose,
  chat,
}: GroupSettingsModalProps) {
  const [groupName, setGroupName] = useState(chat.name || "");
  const [groupDescription, setGroupDescription] = useState(
    chat.description || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();

  const { data: searchResults = [] } = useSearchUsers(searchQuery);
  const { mutate: updateGroup, isPending: updatingGroup } =
    useUpdateGroupChat();
  const { mutate: addParticipants, isPending: addingParticipants } =
    useAddParticipants();
  const { mutate: removeParticipant, isPending: removingParticipant } =
    useRemoveParticipant();
  const { mutate: leaveGroup, isPending: leavingGroup } = useLeaveGroup();

  useEffect(() => {
    setGroupName(chat.name || "");
    setGroupDescription(chat.description || "");
  }, [chat]);

  const isAdmin =
    chat.admins?.includes(user?.email || "") || chat.createdBy === user?.email;

  const handleUpdateGroup = () => {
    if (!groupName.trim()) return;

    updateGroup({
      chatId: chat._id,
      updateData: {
        name: groupName.trim(),
        description: groupDescription.trim() || undefined,
      },
    });
  };

  const handleAddParticipant = (newUser: TUser) => {
    if (chat.participants.find((p) => p.email === newUser.email)) return;

    addParticipants({
      chatId: chat._id,
      participantIds: [newUser.email],
    });
    setSearchQuery("");
  };

  const handleRemoveParticipant = (participantEmail: string) => {
    removeParticipant({
      chatId: chat._id,
      participantId: participantEmail,
    });
  };

  const handleLeaveGroup = () => {
    leaveGroup(chat._id);
    onClose();
  };

  const filteredSearchResults = searchResults.filter(
    (user) => !chat.participants.find((p) => p.email === user.email)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Group Settings</ModalHeader>
        <ModalBody>
          <Tabs fullWidth>
            <Tab key="info" title="Group Info">
              <div className="space-y-4">
                <Input
                  label="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  isDisabled={!isAdmin}
                />

                <Textarea
                  label="Description"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  minRows={2}
                  isDisabled={!isAdmin}
                />

                {isAdmin && (
                  <Button
                    color="primary"
                    onPress={handleUpdateGroup}
                    isLoading={updatingGroup}
                    isDisabled={!groupName.trim()}
                  >
                    Update Group
                  </Button>
                )}
              </div>
            </Tab>

            <Tab key="members" title="Members">
              <div className="space-y-4">
                {isAdmin && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Add Members
                    </label>
                    <Autocomplete
                      placeholder="Search users..."
                      inputValue={searchQuery}
                      onInputChange={setSearchQuery}
                      items={filteredSearchResults}
                      onSelectionChange={(key) => {
                        const selectedUser = filteredSearchResults.find(
                          (u) => u.email === key
                        );
                        if (selectedUser) handleAddParticipant(selectedUser);
                      }}
                    >
                      {(user) => (
                        <AutocompleteItem
                          key={user.email}
                          textValue={user.name}
                        >
                          <div className="flex items-center gap-2">
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
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Members ({chat.participants.length})
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {chat.participants.map((participant) => {
                      const isParticipantAdmin = chat.admins?.includes(
                        participant.email
                      );
                      const isCurrentUser = participant.email === user?.email;

                      return (
                        <div
                          key={participant.email}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={participant.profileImage}
                              name={participant.name}
                              size="sm"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">
                                  {participant.name}
                                </p>
                                {isParticipantAdmin && (
                                  <Crown
                                    size={14}
                                    className="text-yellow-500"
                                  />
                                )}
                                {isCurrentUser && (
                                  <span className="text-xs text-gray-500">
                                    (You)
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                @{participant.userName}
                              </p>
                            </div>
                          </div>

                          {isAdmin && !isCurrentUser && (
                            <Button
                              size="sm"
                              variant="light"
                              color="danger"
                              isIconOnly
                              onPress={() =>
                                handleRemoveParticipant(participant.email)
                              }
                              isLoading={removingParticipant}
                            >
                              <UserMinus size={16} />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
          <Button
            color="danger"
            variant="light"
            onPress={handleLeaveGroup}
            isLoading={leavingGroup}
          >
            Leave Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
