import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllChats,
  getChatMessages,
  sendMessage,
  createDirectChat,
  createGroupChat,
  updateGroupChat,
  addParticipants,
  removeParticipant,
  leaveGroup,
  markMessagesAsRead,
  searchUsers,
} from "../services/ChatServices";
import { TCreateGroup, TUpdateGroup } from "../types";

// Get all chats
export const useGetAllChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getAllChats,
  });
};

// Get chat messages
export const useGetChatMessages = (chatId: string, page = 1) => {
  return useQuery({
    queryKey: ["chat-messages", chatId, page],
    queryFn: () => getChatMessages(chatId, page),
    enabled: !!chatId,
  });
};

// Send message
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatId,
      content,
      messageType,
      fileUrl,
      fileName,
    }: {
      chatId: string;
      content: string;
      messageType?: "text" | "image" | "file";
      fileUrl?: string;
      fileName?: string;
    }) => sendMessage(chatId, content, messageType, fileUrl, fileName),
    onSuccess: (data, variables) => {
      // Update chat messages
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.chatId],
      });
      // Update chats list to show latest message
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send message");
    },
  });
};

// Create direct chat
export const useCreateDirectChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDirectChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Chat created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create chat");
    },
  });
};

// Create group chat
export const useCreateGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroupChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Group created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create group");
    },
  });
};

// Update group chat
export const useUpdateGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatId,
      updateData,
    }: {
      chatId: string;
      updateData: TUpdateGroup;
    }) => updateGroupChat(chatId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Group updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update group");
    },
  });
};

// Add participants
export const useAddParticipants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatId,
      participantIds,
    }: {
      chatId: string;
      participantIds: string[];
    }) => addParticipants(chatId, participantIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Participants added successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to add participants"
      );
    },
  });
};

// Remove participant
export const useRemoveParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatId,
      participantId,
    }: {
      chatId: string;
      participantId: string;
    }) => removeParticipant(chatId, participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Participant removed successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove participant"
      );
    },
  });
};

// Leave group
export const useLeaveGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Left group successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to leave group");
    },
  });
};

// Mark messages as read
export const useMarkMessagesAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessagesAsRead,
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat-messages", chatId] });
    },
  });
};

// Search users
export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["search-users", query],
    queryFn: () => searchUsers(query),
    enabled: query.length > 2,
  });
};
