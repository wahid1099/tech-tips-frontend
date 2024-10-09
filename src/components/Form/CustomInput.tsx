import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";

import { TInput } from "@/src/types/index";

interface IProps extends TInput {
  variant?: "underlined" | "faded" | "flat" | "bordered";
  size?: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
  required?: boolean;
  type?: string;
  label?: ReactNode;
  name: string;
  startContent?: React.ReactNode; // <-- Add this
  endContent?: React.ReactNode;
}

export const CustomInput = ({
  variant = "bordered",
  size = "lg",
  required = false,
  type = "text",
  label,
  startContent, // <-- Add this
  endContent,
  radius,
  name,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      startContent={startContent} // <-- Add this
      endContent={endContent}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      radius={radius}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
};
