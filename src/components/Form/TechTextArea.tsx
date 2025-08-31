import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";
import { ReactNode } from "react";

import { TInput } from "@/src/types";

interface IProps extends TInput {
  type?: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  label: ReactNode;
  minRows?: number;
}

export const TechTextArea = ({
  name,
  label,
  minRows = 2,
  variant = "bordered",
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      minRows={minRows}
      radius="none"
      value={currentValue || ""}
      variant={variant}
    />
  );
};
