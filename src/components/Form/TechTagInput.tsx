"use client";

import { Chip, Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { KeyboardEvent, useState } from "react";

import { TInput } from "@/src/types";

interface IProps extends TInput {
  chipSize?: "sm" | "md" | "lg" | undefined;
}

export default function TechTagInput({
  label,
  name,
  required = false,
  size = "md",
  variant = "bordered",
  chipSize,
}: IProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];

        setTags(newTags);
        setValue(name, newTags);
      }

      setInputValue("");
    }
  };

  const handleDelete = (tagToDelete: string) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);

    setTags(newTags);
    setValue(name, newTags);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag, index) => (
        <Chip key={index} className="flex items-center" size={chipSize}>
          {tag}
          <button
            className="ml-2 text-lg cursor-pointer inline-block text-red-500"
            onClick={() => handleDelete(tag)}
          >
            &times;
          </button>
        </Chip>
      ))}

      <Input
        errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
        isDisabled={tags?.length === 4}
        isInvalid={!!errors[name]}
        label={label}
        placeholder="Add a tag"
        radius="sm"
        required={required}
        size={size}
        value={inputValue}
        variant={variant}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
