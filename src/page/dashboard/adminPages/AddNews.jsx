import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const AddNews = () => {
  const [users, loading] = useUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  // Function to resize image
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        720,
        "WEBP",
        95,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const onSubmit = async (data) => {
    if (!cloud_name || !preset_key) {
      throw new Error("Cloudinary configuration is missing");
    }

    if (image) {
      try {
        const resizedImage = await resizeFile(image);
        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        const photoUrl = res.data.secure_url;

        const newNews = {
          title: data.title,
          summary: data.summary, // Added summary here
          details: data.details,
          image: photoUrl,
          createdAt: new Date(), // Optional: Automatically set createdAt time
          authorEmail: users?.email || "unknown", // Optional: Save author email
        };

        await axiosSecure.post("/News", newNews).then((res) => {
          if (res.data.insertedId) {
            navigate("/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "News posted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        console.log("New News Object:", newNews);
      } catch (error) {
        setError("Error uploading image to Cloudinary.");
        console.error("Error uploading image:", error);
      }
    } else {
      setError("Please upload an image.");
    }

    setError(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-2 bg-white dark:bg-gray-950 text-gray-950 dark:text-white rounded-lg shadow border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-4">Post New Updates or News</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="title">
            News Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Enter News title"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="summary">
            News Summary
          </label>
          <textarea
            id="summary"
            {...register("summary", { required: "Summary is required" })}
            rows="4"
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Write news summary here"
          />
          {errors.summary && (
            <span className="text-red-500">{errors.summary.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="details">
            News Details
          </label>
          <textarea
            id="details"
            {...register("details", { required: "Details are required" })}
            rows="7"
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Write detailed news here"
          />
          {errors.details && (
            <span className="text-red-500">{errors.details.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="image">
            News Image
          </label>
          <div className="mt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                document.getElementById("news_image_input")?.click()
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
              id="news_image_input"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="News preview"
                className="h-28 w-auto rounded-md border"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn w-full bg-primary-600 hover:bg-primary-700 text-white border-none md:text-xl text-lg"
        >
          Publish News
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddNews;
