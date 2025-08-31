import { AxiosResponse } from "axios";
import axiosInstance from "./axiosClient";
import {
  TChat,
  TMessage,
  TCreateGroup,
  TUpdateGroup,
  TChatList,
  TUser,
} from "@/src/types";

// Get all chats for current user
export const getAllChats = async (): Promise<TChatList> => {
  const { data }: AxiosResponse<TChatList> = await axiosInstance.get("/chats");
  return data;
};

// Get messages for a specific chat
export const getChatMessages = async (
  chatId: string,
  page = 1,
  limit = 50
): Promise<{
  messages: TMessage[];
  hasMore: boolean;
  totalMessages: number;
}> => {
  const { data } = await axiosInstance.get(
    `/chats/${chatId}/messages?page=${page}&limit=${limit}`
  );
  return data;
};

// Send a message
export const sendMessage = async (
  chatId: string,
  content: string,
  messageType: "text" | "image" | "file" = "text",
  fileUrl?: string,
  fileName?: string
): Promise<TMessage> => {
  const { data }: AxiosResponse<TMessage> = await axiosInstance.post(
    `/chats/${chatId}/messages`,
    {
      content,
      messageType,
      fileUrl,
      fileName,
    }
  );
  return data;
};

// Create or get direct chat
export const createDirectChat = async (
  participantId: string
): Promise<TChat> => {
  const { data }: AxiosResponse<TChat> = await axiosInstance.post(
    "/chats/direct",
    {
      participantId,
    }
  );
  return data;
};

// Create group chat
export const createGroupChat = async (
  groupData: TCreateGroup
): Promise<TChat> => {
  const { data }: AxiosResponse<TChat> = await axiosInstance.post(
    "/chats/group",
    groupData
  );
  return data;
};

// Update group chat
export const updateGroupChat = async (
  chatId: string,
  updateData: TUpdateGroup
): Promise<TChat> => {
  const { data }: AxiosResponse<TChat> = await axiosInstance.put(
    `/chats/group/${chatId}`,
    updateData
  );
  return data;
};

// Add participants to group
export const addParticipants = async (
  chatId: string,
  participantIds: string[]
): Promise<TChat> => {
  const { data }: AxiosResponse<TChat> = await axiosInstance.post(
    `/chats/group/${chatId}/participants`,
    {
      participantIds,
    }
  );
  return data;
};

// Remove participant from group
export const removeParticipant = async (
  chatId: string,
  participantId: string
): Promise<TChat> => {
  const { data }: AxiosResponse<TChat> = await axiosInstance.delete(
    `/chats/group/${chatId}/participants/${participantId}`
  );
  return data;
};

// Leave group
export const leaveGroup = async (chatId: string): Promise<void> => {
  await axiosInstance.post(`/chats/group/${chatId}/leave`);
};

// Mark messages as read
export const markMessagesAsRead = async (chatId: string): Promise<void> => {
  await axiosInstance.post(`/chats/${chatId}/read`);
};

// Search users for chat
export const searchUsers = async (query: string): Promise<TUser[]> => {
  const { data } = await axiosInstance.get(`/users/search?q=${query}`);
  return data;
};
