"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { FileText, Download } from "lucide-react";
import { TMessage } from "@/src/types";

interface MessageBubbleProps {
  message: TMessage;
  isOwn: boolean;
  showAvatar: boolean;
}

export default function MessageBubble({
  message,
  isOwn,
  showAvatar,
}: MessageBubbleProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessageContent = () => {
    switch (message.messageType) {
      case "image":
        return (
          <div className="max-w-xs">
            <Image
              src={message.fileUrl}
              alt="Shared image"
              className="rounded-lg"
            />
            {message.content && (
              <p className="mt-2 text-sm">{message.content}</p>
            )}
          </div>
        );

      case "file":
        return (
          <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-xs">
            <FileText size={24} className="text-blue-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <Link
                href={message.fileUrl}
                target="_blank"
                className="text-xs text-blue-500 flex items-center gap-1"
              >
                <Download size={12} />
                Download
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        );
    }
  };

  return (
    <div className={`flex gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && showAvatar && (
        <Avatar
          src={message.sender.profileImage}
          name={message.sender.name}
          size="sm"
          className="flex-shrink-0"
        />
      )}

      <div
        className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-xs sm:max-w-md`}
      >
        {!isOwn && showAvatar && (
          <p className="text-xs text-gray-500 mb-1 px-2">
            {message.sender.name}
          </p>
        )}

        <Card
          className={`${
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          <CardBody className="p-3">
            {renderMessageContent()}

            <div
              className={`flex items-center gap-2 mt-2 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`text-xs ${
                  isOwn ? "text-primary-foreground/70" : "text-gray-500"
                }`}
              >
                {formatTime(message.createdAt)}
              </span>

              {message.isEdited && (
                <span
                  className={`text-xs ${
                    isOwn ? "text-primary-foreground/70" : "text-gray-500"
                  }`}
                >
                  (edited)
                </span>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {isOwn && showAvatar && (
        <Avatar
          src={message.sender.profileImage}
          name={message.sender.name}
          size="sm"
          className="flex-shrink-0"
        />
      )}
    </div>
  );
}
