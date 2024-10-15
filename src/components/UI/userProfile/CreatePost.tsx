// "use client";
// import { Button, Radio, RadioGroup } from "@nextui-org/react";
// import dynamic from "next/dynamic";
// import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
// import { toast } from "sonner";

// import CustomForm from "@/src/components/Form/CustomForm";
// import { CustomInput } from "@/src/components/Form/CustomInput";
// // eslint-disable-next-line import/order
// import TechSelect from "@/src/components/Form/TechSelect";

// import "react-quill/dist/quill.snow.css";
// import { TechTextArea } from "@/src/components/Form/TechTextArea";
// import TechTagInput from "../../form/TechTagInput";

// import { categoryOptions } from "@/src/constant";
// import { IUser, TPost } from "@/src/types";
// import { useCreatePost, useUpdatePost } from "@/src/hooks/post.hooks";
// import uploadImageToCloudinary from "@/src/utils/uploadImage";
// import handleBase64Images from "@/src/utils/handleBase64Images";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

// interface IProps {
//   post?: TPost;
//   user?: IUser;
//   btn: string;
//   closeModal: () => void;
// }

// const CreatePost = ({ btn, user, post, closeModal }: IProps) => {
//   const { mutate: createHandlePost, isPending, isSuccess } = useCreatePost();
//   const {
//     mutate: updateHandlePost,
//     isPending: updatePending,
//     isSuccess: updateSuccess,
//   } = useUpdatePost();
//   const [premium, setPremium] = useState(post?.isPremium ? "premium" : "free");
//   const [value, setValue] = useState(post?.contents || "");
//   const [thumbnail, setThumbnail] = useState<string | "">(
//     post?.thumbnail || ""
//   );

//   const [thumbnailUploadLoading, setThumbnailUploadLoading] = useState(false);
//   const validOptios = ["free", "premium"];
//   const isInValid = !validOptios.includes(premium);

//   const modules = useMemo(() => {
//     if (typeof window !== "undefined") {
//       const Quill = require("react-quill").Quill;
//       const QuillResizeImage = require("quill-resize-image");

//       Quill.register("modules/resize", QuillResizeImage);

//       return {
//         toolbar: [
//           [{ header: [1, 2, 3, false] }],
//           ["bold", "italic", "underline", "strike", "blockquote"],
//           [
//             { list: "ordered" },
//             { list: "bullet" },
//             { indent: "-1" },
//             { indent: "+1" },
//           ],
//           ["link", "image"],
//           ["clean"],
//         ],
//         resize: { locale: {} },
//       };
//     }

//     return {};
//   }, []);

//   const handleUploadThumbnail: ChangeEventHandler<HTMLInputElement> = async (
//     e: any
//   ) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       return;
//     }
//     setThumbnailUploadLoading(true);

//     try {
//       const files = await uploadImageToCloudinary(e.target.files);

//       if (files && files.length > 0) {
//         setThumbnail(files);
//       }
//     } catch (error: any) {
//       toast.error("Error uploading image:", error);
//     } finally {
//       setThumbnailUploadLoading(false);
//     }
//   };
//   const defaultValues = {
//     title: post?.title || "",
//     description: post?.description || "",
//     category: post?.category || "",
//     tags: post?.tags || [],
//   };
//   const onSubmit = async (data: any) => {
//     let modifiedContent = await handleBase64Images(value);

//     modifiedContent = modifiedContent.replace(/"/g, "'");

//     const title = data?.title;
//     const description = data?.description;
//     const category = data?.category;
//     const contents = modifiedContent;
//     const tags = data?.tags;
//     const author = user?._id as string;
//     const isPremium = premium === "premium" ? true : false;
//     const postData = {
//       title,
//       description,
//       category,
//       tags,
//       contents,
//       author,
//       isPremium,
//       thumbnailImage: thumbnail,
//     };

//     if (btn === "Create Post") {
//       if (
//         title === "" ||
//         description === "" ||
//         category === "" ||
//         contents === "" ||
//         tags.every((tag: string) => tag.trim() === "") ||
//         author === undefined ||
//         thumbnail === ""
//       ) {
//         toast.error("Please fill all required fields");

//         return;
//       }
//       createHandlePost(postData);
//     } else {
//       // Update post
//       updateHandlePost({ id: post?._id as string, postData });
//     }
//   };

//   useEffect(() => {
//     if (isSuccess || updateSuccess) {
//       setValue("");
//       closeModal();
//     }
//   }, [isSuccess, closeModal, updateSuccess]);

//   return (
//     <div className="p-5">
//       <TechForm defaultValues={defaultValues} onSubmit={onSubmit}>
//         <div>
//           <TechInput
//             label="Post Title"
//             name="title"
//             radius="none"
//             size="md"
//             type="text"
//             variant="bordered"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//           <div>
//             <TechSelect
//               label={
//                 <>
//                   Category
//                   <sup className="ml-1 text-red-500">*</sup>
//                 </>
//               }
//               name="category"
//               options={categoryOptions}
//               radius="none"
//               size="md"
//               type="email"
//               variant="bordered"
//             />
//           </div>
//           <div>
//             <TechTagInput
//               label={
//                 <>
//                   Tage <sup className="ml-1 text-red-500">*</sup>
//                 </>
//               }
//               name="tags"
//             />
//           </div>
//         </div>

//         <div className="mt-4">
//           <TechTextArea
//             label={
//               <>
//                 Post Description <sup className="ml-1 text-red-500">*</sup>
//               </>
//             }
//             name="description"
//             radius="none"
//             variant="bordered"
//           />
//         </div>
//         <div className="mt-4 w-full">
//           <label
//             className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
//             htmlFor="image"
//           >
//             Upload image
//           </label>
//           <input
//             className="hidden"
//             id="image"
//             type="file"
//             onChange={(e) => handleUploadThumbnail(e)}
//           />
//         </div>
//         <div className="mt-4">
//           <span className="block text-sm text-gray-400 mb-2">
//             Content
//             <sup className="ml-1 text-red-500">*</sup>
//           </span>
//           <ReactQuill
//             className="rounded-lg border border-gray-300 p-2"
//             formats={formats}
//             modules={modules}
//             theme="snow"
//             value={value}
//             onChange={setValue}
//           />
//         </div>

//         <div className="mt-4">
//           <RadioGroup
//             isInvalid={isInValid}
//             label={
//               <>
//                 Post Status
//                 <sup className="ml-1 text-red-500">*</sup>
//               </>
//             }
//             orientation="horizontal"
//             value={premium}
//             onValueChange={setPremium}
//           >
//             <Radio value="free">Free</Radio>
//             <Radio value="premium">Premium</Radio>
//           </RadioGroup>
//         </div>
//         <div className="mt-6 w-full">
//           <Button
//             className="px-5 w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-400 transition duration-300"
//             disabled={thumbnailUploadLoading}
//             isLoading={isPending || updatePending}
//             type="submit"
//           >
//             {btn}
//           </Button>
//         </div>
//       </TechForm>
//     </div>
//   );
// };

// export default CreatePost;
