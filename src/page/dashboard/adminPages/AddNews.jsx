import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  // Function to resize image
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // File to resize
        1080, // Max width
        720, // Max height
        "WEBP", // Output format
        95, // Quality (0-100)
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "file" // Output type
      );
    });

  const onSubmit = async (data) => {
    if (!cloud_name || !preset_key) {
      throw new Error("Cloudinary configuration is missing");
    }

    if (image) {
      try {
        const resizedImage = await resizeFile(image); // Resize the image first
        const formData = new FormData();
        formData.append("file", resizedImage); // Upload the resized image
        formData.append("upload_preset", preset_key);

        // Upload image to Cloudinary
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        const photoUrl = res.data.secure_url; // Cloudinary URL of the uploaded image

        const newNews = {
          title: data.title,
          details: data.details,
          image: photoUrl, // Save the Cloudinary image URL
        };
        // post News to database
        axiosSecure.post("/News", newNews).then((res) => {
          console.log(res);
          if (res.data.insertedId) {
            navigate("/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "News post successfully ",
              showConfirmButton: false,
              timer: 1000,
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

    setError(null); // Reset error state after submission
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">New Updates or News</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="title">
            News Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Enter News title"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="details">
            News Summary
          </label>
          <textarea
            id="details"
            {...register("summary", { required: "summary is required" })}
            rows="3"
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Write your News summary here"
          />
          {errors.summary && (
            <span className="text-red-500">{errors.summary.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="details">
            News details
          </label>
          <textarea
            id="details"
            {...register("details", { required: "details is required" })}
            rows="7"
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Write your News details here"
          />
          {errors.details && (
            <span className="text-red-500">{errors.details.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="image">
            News Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mt-2"
          />
        </div>
        <button
          type="submit"
          className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full"
        >
          Submit News
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};
export default AddNews;
