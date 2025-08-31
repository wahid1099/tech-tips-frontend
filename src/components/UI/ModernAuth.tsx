"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Card, CardBody, Button, Divider } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import CustomForm from "@/src/components/Form/CustomForm";
import { CustomInput } from "@/src/components/Form/CustomInput";
import TechSelect from "@/src/components/Form/TechSelect";
import TechDatePicker from "@/src/components/Form/TechDatePicker";
import { dateToISO } from "@/src/utils/dateConverter";
import { useUserRegistration, useUserLogin } from "@/src/hooks/Auth.hook";
import { useUser } from "@/src/context/UserContext";
import uploadImageToCloudinary from "@/src/utils/uploadImage";
import { loginValidationSchema } from "@/src/schema/user.schema";
import AuthLoading from "@/src/components/Loading/AuthLoading";
import {
  EmailIcon,
  PasswordIcon,
  UploadIcon,
  LocationIcon,
  UserIcon,
  EyeInvisibleIcon,
  EyeVisibleIcon,
} from "@/src/components/icons";

const ModernAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [profileImage, setProfileImage] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const { mutate: handleUserRegistration, isPending: isRegistering } =
    useUserRegistration();
  const {
    mutate: handleUserLogin,
    isPending: isLoggingIn,
    isSuccess: loginSuccess,
  } = useUserLogin();
  const { isSetLoading } = useUser();

  const wasLoggingInRef = useRef(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const genderOptions = [
    { key: "select-gender", label: "Select Gender" },
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "other", label: "Other" },
  ];

  const onSubmitLogin: SubmitHandler<FieldValues> = async (data) => {
    handleUserLogin(data);
  };

  const onSubmitRegister: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      birthDate: dateToISO(data.birthDate),
      profileImage: profileImage,
    };
    handleUserRegistration(userData);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setImageUploadLoading(true);
    try {
      const file = e.target.files[0];
      const uploadedImageUrl = await uploadImageToCloudinary(file);
      if (uploadedImageUrl) {
        setProfileImage(uploadedImageUrl);
      }
    } catch (error: any) {
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Handle successful login redirect
  useEffect(() => {
    if (isLoggingIn) {
      wasLoggingInRef.current = true;
    } else if (wasLoggingInRef.current && !isLoggingIn && loginSuccess) {
      // Login was successful, now redirect
      wasLoggingInRef.current = false;
      const timer = setTimeout(() => {
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoggingIn, loginSuccess, redirect, router]);

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <>
      {isLoggingIn && <AuthLoading />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardBody className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome Back
                </motion.h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {activeTab === "login"
                    ? "Sign in to your account"
                    : "Create your account"}
                </p>
              </div>

              {/* Tab Buttons */}
              <div className="flex mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "login"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "register"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <motion.div
                    key="login"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <CustomForm
                      resolver={zodResolver(loginValidationSchema)}
                      onSubmit={onSubmitLogin}
                    >
                      <div className="space-y-6">
                        <CustomInput
                          label="Email"
                          name="email"
                          type="email"
                          variant="bordered"
                          size="lg"
                          radius="md"
                          startContent={
                            <EmailIcon size={20} className="text-gray-400" />
                          }
                        />

                        <CustomInput
                          label="Password"
                          name="password"
                          type={isVisible ? "text" : "password"}
                          variant="bordered"
                          size="lg"
                          radius="md"
                          startContent={
                            <PasswordIcon size={20} className="text-gray-400" />
                          }
                          endContent={
                            <button
                              type="button"
                              onClick={toggleVisibility}
                              className="focus:outline-none"
                            >
                              {isVisible ? (
                                <EyeInvisibleIcon className="text-gray-400 hover:text-gray-600" />
                              ) : (
                                <EyeVisibleIcon className="text-gray-400 hover:text-gray-600" />
                              )}
                            </button>
                          }
                        />

                        <div className="flex items-center justify-between">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                              Remember me
                            </span>
                          </label>
                          <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-500"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                          size="lg"
                          isLoading={isLoggingIn}
                          disabled={isLoggingIn}
                        >
                          {isLoggingIn ? "Signing In..." : "Sign In"}
                        </Button>
                      </div>
                    </CustomForm>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <CustomForm onSubmit={onSubmitRegister}>
                      <div className="space-y-4">
                        <CustomInput
                          label="Full Name"
                          name="name"
                          variant="bordered"
                          size="lg"
                          radius="md"
                          startContent={
                            <UserIcon size={20} className="text-gray-400" />
                          }
                        />

                        <CustomInput
                          label="Email"
                          name="email"
                          type="email"
                          variant="bordered"
                          size="lg"
                          radius="md"
                          startContent={
                            <EmailIcon size={20} className="text-gray-400" />
                          }
                        />

                        <CustomInput
                          label="Password"
                          name="password"
                          type={isVisible ? "text" : "password"}
                          variant="bordered"
                          size="lg"
                          radius="md"
                          startContent={
                            <PasswordIcon size={20} className="text-gray-400" />
                          }
                          endContent={
                            <button
                              type="button"
                              onClick={toggleVisibility}
                              className="focus:outline-none"
                            >
                              {isVisible ? (
                                <EyeInvisibleIcon className="text-gray-400 hover:text-gray-600" />
                              ) : (
                                <EyeVisibleIcon className="text-gray-400 hover:text-gray-600" />
                              )}
                            </button>
                          }
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <TechSelect
                            label="Gender"
                            name="gender"
                            options={genderOptions}
                            size="lg"
                            radius="md"
                          />
                          <TechDatePicker
                            label="Date of Birth"
                            name="birthDate"
                            radius="md"
                          />
                        </div>

                        <CustomInput
                          label="Address"
                          name="address"
                          variant="bordered"
                          size="lg"
                          radius="md"
                          startContent={
                            <LocationIcon size={20} className="text-gray-400" />
                          }
                        />

                        <div className="mb-4">
                          <label className="flex items-center justify-center h-14 w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-colors">
                            <div className="flex items-center space-x-2">
                              <UploadIcon size={20} className="text-gray-400" />
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {imageUploadLoading
                                  ? "Uploading..."
                                  : "Upload Profile Image"}
                              </span>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                          size="lg"
                          isLoading={isRegistering || imageUploadLoading}
                          disabled={isRegistering || imageUploadLoading}
                        >
                          {isRegistering
                            ? "Creating Account..."
                            : "Create Account"}
                        </Button>
                      </div>
                    </CustomForm>
                  </motion.div>
                )}
              </AnimatePresence>

              <Divider className="my-6" />

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === "login" ? "register" : "login")
                    }
                    className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
                  >
                    {activeTab === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ModernAuth;
