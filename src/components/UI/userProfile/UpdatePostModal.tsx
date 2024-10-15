import { ChangeEventHandler, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  Switch,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import { useUser } from "@/src/context/UserContext";
import dynamic from "next/dynamic";
import {
  AiOutlinePicture,
  AiOutlineVideoCamera,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdEventNote } from "react-icons/md";
import Postskeleton from "@/src/components/posts/Postskeleton";
import { useCreatePost, useUpdatePost } from "@/src/hooks/Post.hooks";
import uploadImageToCloudinary from "@/src/utils/uploadImage";
import TCreatePost, { dropdownItems, TPost } from "@/src/types";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

interface IProps {
  post?: TPost; // Accept post data as props for editing
  isEdit?: boolean; // Flag to indicate edit mode
  closeModal: () => void;
}

const EditorModal: React.FC<IProps> = ({
  post,
  isEdit = false,
  closeModal,
}) => {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false); // Control modal open state
  const [title, setTitle] = useState(""); // Set default states
  const [editorValue, setEditorValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailUploadLoading, setThumbnailUploadLoading] = useState(false);

  const { mutate: createHandlePost, isPending, isSuccess } = useCreatePost();
  const {
    mutate: updateHandlePost,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useUpdatePost();
  const [thumbnail, setThumbnail] = useState<string | "">(
    post?.thumbnail || ""
  );

  // UseEffect to set data when modal is opened for editing
  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title);
      setEditorValue(post.description);
      setCategory(post.category);
      setTags(post.tags || []);
      setIsPremium(post.isPremium);
    }
  }, [post, isEdit]);

  const handleUploadThumbnail: ChangeEventHandler<HTMLInputElement> = async (
    e: any
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setThumbnailUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files[0]);

      if (files && files.length > 0) {
        setThumbnail(files);
      }
    } catch (error: any) {
      toast.error("Error uploading image:", error);
    } finally {
      setThumbnailUploadLoading(false);
    }
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    closeModal();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => setImage(null);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const resetForm = () => {
    setTitle("");
    setEditorValue("");
    setImage(null);
    setCategory("");
    setTags([]);
    setIsPremium(false);
  };

  const handlePost = async () => {
    if (!title.trim() || !editorValue.trim()) {
      toast.error("Title and Description are required.");
      return;
    }

    try {
      let uploadedImage = post?.thumbnailImage || null;
      if (image) {
        uploadedImage = await uploadImageToCloudinary(image);
      }

      const postData: TCreatePost = {
        title,
        description: editorValue,
        category,
        tags,
        contents: editorValue,
        author: user?._id as string,
        isPremium,
        thumbnailImage: uploadedImage || "",
      };

      if (isEdit && post?._id) {
        updateHandlePost({ id: post?._id as string, postData });
      } else {
        createHandlePost(postData);
      }

      // Reset form state after submission
      resetForm();
      handleClose(); // Close modal after posting
    } catch (error) {
      toast.error("Error creating post. Please try again.");
      console.error("Error creating post:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  if (isLoading) {
    return <Postskeleton />;
  }

  return (
    <div className="flex justify-center pt-8">
      <Button color="primary" onClick={handleOpen}>
        {isEdit ? "Update Post" : "Create Post"}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent className="dark:bg-gray-900">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEdit ? "Update Post" : "Create Post"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4 dark:bg-gray-900 dark:text-white"
                  classNames={{
                    input: "dark:bg-gray-700 dark:text-white",
                    inputWrapper: "dark:bg-gray-700",
                  }}
                />
                <ReactQuill
                  modules={modules}
                  value={editorValue}
                  onChange={setEditorValue}
                  theme="snow"
                  style={{ height: "400px" }}
                />

                <div className="mt-12">
                  <label className="text-gray-700 dark:text-gray-300">
                    Attach Image:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="max-h-40"
                      />
                      <Button
                        onClick={handleRemoveImage}
                        color="danger"
                        size="sm"
                        className="mt-2"
                      >
                        Remove Image
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="text-gray-700 dark:text-gray-300">
                    Select Category:
                  </label>
                  <Dropdown backdrop="blur">
                    <DropdownTrigger>
                      <Button variant="bordered">
                        {category || "Select Category"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dynamic Actions"
                      items={dropdownItems}
                      onAction={(key) => setCategory(key as string)}
                    >
                      {(item) => (
                        <DropdownItem key={item.key}>{item.label}</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="mt-4">
                  <Input
                    label="Tags"
                    placeholder="Enter tags separated by commas"
                    value={tags.join(", ")}
                    onChange={handleTagsChange}
                    classNames={{
                      input: "dark:bg-gray-700 dark:text-white",
                      inputWrapper: "dark:bg-gray-700",
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="text-gray-700 dark:text-gray-300">
                    Mark as Premium:
                  </label>
                  <Switch
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={isPending || updatePending}
                  onClick={handlePost}
                  className="ml-2"
                >
                  {isEdit ? "Update Post" : "Create Post"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditorModal;
