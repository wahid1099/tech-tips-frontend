"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";

interface TypingIndicatorProps {
  typingUsers: string[];
  showAvatar?: boolean;
}

export default function TypingIndicator({
  typingUsers,
  showAvatar = false,
}: TypingIndicatorProps) {
  if (typingUsers.length === 0) return null;

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0]} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    } else {
      return `${typingUsers[0]} and ${typingUsers.length - 1} others are typing...`;
    }
  };

  return (
    <div className="flex gap-2 justify-start">
      {showAvatar && <Avatar size="sm" className="opacity-50" />}

      <Card className="bg-gray-100 dark:bg-gray-800 max-w-xs">
        <CardBody className="p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getTypingText()}
            </span>
            <div className="flex gap-1">
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
