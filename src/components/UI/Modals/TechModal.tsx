"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import React from "react";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  title: string;
  children: ReactNode | ((closeModal: () => void) => ReactNode);
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonRadius?: "none" | "sm" | "md" | "lg" | "full";
  buttonClassName?: string;
  scrollBehavior?: "inside" | "outside";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  bgColor?: string;
}

export default function TechModal({
  buttonText,
  title,
  children,
  buttonVariant = "bordered",
  buttonRadius,
  buttonClassName,
  scrollBehavior,
  size = "3xl",
}: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const closeModal = () => {
    onClose();
  };

  return (
    <div>
      <Button
        className={buttonClassName}
        radius={buttonRadius}
        size="lg"
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        className="border"
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size={size}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="pb-2">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {typeof children === "function"
                  ? children(closeModal)
                  : children}
              </ModalBody>
              {/* <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
