import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCollaborator = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        720,
        "WEBP",
        95,
        0,
        (uri) => resolve(uri),
        "file"
      );
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setValue("image", file);
      setError(null);
    }
  };

  // preview url
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onSubmit = async (data) => {
    if (!image) {
      setError("Please upload a logo image");
      return;
    }

    setUploading(true);

    try {
      const resizedImage = await resizeFile(image);

      const formData = new FormData();
      formData.append("file", resizedImage);
      formData.append("upload_preset", preset_key);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await cloudinaryRes.json();
      const logoUrl = cloudData.secure_url;

      const collaborator = {
        name: data.name,
        logo: logoUrl,
      };

      const res = await axiosSecure.post("/collaborations", collaborator);
      if (res.data.insertedId) {
        reset();
        navigate("/");
      }
    } catch (err) {
      console.error("Upload failed", err);
      setError("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-950 text-gray-950 dark:text-white rounded-xl shadow border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-semibold mb-6">Add Collaborator</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">University Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="e.g., Bangladesh University of Business and Technology"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">University Logo</label>
          <div className="mt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                document.getElementById("collab_logo_input")?.click()
              }
              className="btn btn-outline btn-square"
              aria-label="Add image"
              title="Add image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" />
              </svg>
            </button>
            <input
              id="collab_logo_input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Logo preview"
                className="h-20 w-auto rounded-md border"
              />
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          className="btn w-full bg-primary-600 hover:bg-primary-700 text-white border-none"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Collaborator"}
        </button>
      </form>
    </div>
  );
};

export default AddCollaborator;
