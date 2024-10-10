"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import "./auth.css";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { IoMdLogIn } from "react-icons/io";
import { CiMail, CiUser } from "react-icons/ci";
import { TbPasswordUser } from "react-icons/tb";
import { FiUpload } from "react-icons/fi";
import CustomForm from "@/src/components/Form/CustomForm";
import { CustomInput } from "@/src/components/Form/CustomInput";
import TechSelect from "@/src/components/Form/TechSelect";
import TechDatePicker from "@/src/components/Form/TechDatePicker";
import { dateToISO } from "@/src/utils/dateConverter";
import { useUserRegistration, useUserLogin } from "@/src/hooks/Auth.hook";
import Loading from "@/src/components/Loading/Loading";
import { useUser } from "@/src/context/UserContext";
import uploadImageToCloudinary from "@/src/utils/uploadImage";
import { loginValidationSchema } from "@/src/schema/user.schema";

const AuthTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: handleUserRegistration } = useUserRegistration();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const { isSetLoading: UserLoading } = useUser();

  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | "">("");

  const [activeTab, setActiveTab] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (key: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsAnimating(false);
    }, 100);
  };

  const genderOptions = [
    { key: "select-gender", label: "Select Gender" },
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "other", label: "Other" },
  ];

  const onSubmitRegister: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      birthDate: dateToISO(data.birthDate),
      profileImage: profileImage,
    };
    handleUserRegistration(userData);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setImageUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files);

      if (files && files.length > 0) {
        setProfileImage(files);
      }
    } catch (error: any) {
      toast.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const onSubmitLogin: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    UserLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="max-w-md w-full">
        <Tabs
          aria-label="Auth Tabs"
          defaultSelectedKey="login"
          onSelectionChange={(key: string | number) =>
            handleTabChange(key.toString())
          }
        >
          <Tab key="login" title="Login">
            <Card className="p-4">
              <CardHeader className="text-xl font-semibold text-center">
                <div className="flex items-center space-x-2">
                  <IoMdLogIn />
                  <span>Login</span>
                </div>
              </CardHeader>
              <CardBody
                className={`fade-transition ${!isAnimating && "fade-transition-active"}`}
              >
                <CustomForm
                  resolver={zodResolver(loginValidationSchema)}
                  onSubmit={onSubmitLogin}
                >
                  <div className="mb-4">
                    <CustomInput
                      label="Email"
                      name="email"
                      radius="none"
                      size="lg"
                      type="email"
                      variant="bordered"
                      startContent={
                        <CiMail className="text-2xl text-default-400" />
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <CustomInput
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Password"
                      name="password"
                      radius="none"
                      size="lg"
                      type={isVisible ? "text" : "password"}
                      variant="bordered"
                      startContent={
                        <TbPasswordUser className="text-2xl text-default-400" />
                      }
                    />
                  </div>

                  <button
                    className="w-full py-2 text-white bg-green-500 font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    type="submit"
                  >
                    Login
                  </button>
                </CustomForm>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="register" title="Register">
            <Card>
              <CardHeader className="text-xl font-semibold text-center">
                Register
              </CardHeader>
              <CardBody
                className={`fade-transition ${!isAnimating && "fade-transition-active"}`}
              >
                <CustomForm onSubmit={onSubmitRegister}>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <CustomInput
                      label="User Name"
                      name="name"
                      size="md"
                      variant="bordered"
                      radius="none"
                      startContent={
                        <CiUser className="text-2xl text-default-400" />
                      }
                    />
                    <CustomInput
                      label="Email"
                      name="email"
                      size="md"
                      type="email"
                      variant="bordered"
                      radius="none"
                      startContent={
                        <CiMail className="text-2xl text-default-400" />
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <CustomInput
                      radius="none"
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Password"
                      name="password"
                      type={isVisible ? "text" : "password"}
                      size="md"
                      variant="bordered"
                      startContent={
                        <TbPasswordUser className="text-2xl text-default-400" />
                      }
                    />
                    <TechSelect
                      radius="none"
                      label="Gender"
                      name="gender"
                      options={genderOptions}
                      size="lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <TechDatePicker
                      label="Date Of Birth"
                      name="birthDate"
                      radius="none"
                    />
                    <CustomInput
                      radius="none"
                      label="Address"
                      name="address"
                      size="md"
                      variant="bordered"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center justify-center h-14 w-full cursor-pointer rounded-xl border-2 border-default-200">
                      <div className="flex items-center space-x-2">
                        {" "}
                        {/* Added space between icon and text */}
                        <FiUpload className="text-2xl text-default-400" />{" "}
                        {/* Optional: you can customize the icon size and color */}
                        <span className="text-lg font-semibold">
                          Upload image
                        </span>{" "}
                        {/* Optional: Adjust the text style */}
                      </div>
                    </label>
                    <input
                      id="image"
                      className="hidden"
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>

                  <button
                    className="w-full py-2 text-white bg-green-500 font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    type="submit"
                    disabled={imageUploadLoading}
                  >
                    Register
                  </button>
                </CustomForm>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthTabs;
