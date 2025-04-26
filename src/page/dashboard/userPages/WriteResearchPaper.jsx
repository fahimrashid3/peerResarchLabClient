import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import Loading from "../../../components/Loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const WriteResearchPaper = () => {
  const [users, loading] = useUsers();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [researchArea, setResearchArea] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    axiosPublic
      .get("/researchArea")
      .then((res) => {
        setResearchArea(res.data);
      })
      .catch((err) => {
        console.error("Error fetching research areas:", err);
        setError("Failed to load research areas");
      });
  }, [axiosPublic]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setValue("image", file);
      setError(null);
    }
  };

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
    try {
      if (!cloud_name || !preset_key) {
        throw new Error("Cloudinary configuration is missing");
      }

      if (!image) {
        setError("Please upload an image");
        return;
      }

      setIsUploading(true);
      setError(null);

      // Step 1: Resize and upload image to Cloudinary
      const resizedImage = await resizeFile(image);
      const formData = new FormData();
      formData.append("file", resizedImage);
      formData.append("upload_preset", preset_key);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      // Step 2: Prepare research data
      const newResearch = {
        title: data.title,
        details: data.details,
        category: data.category,
        authorEmail: users?.email,
        image: cloudinaryRes.data.secure_url,
        createdAt: new Date(),
      };

      // Step 3: Submit research data to your backend
      const researchRes = await axiosSecure.post(
        "/ResearchRequest",
        newResearch
      );

      if (researchRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Research submitted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate("/");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit research. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Research Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Research Title */}
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="title">
            Research Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Enter Research title"
            disabled={isSubmitting || isUploading}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Research Area */}
        <div className="flex-1 mb-4">
          <label className="label">
            <span className="label-text">researchArea</span>
          </label>
          <select
            defaultValue="default"
            {...register("category", { required: true })}
            className="select select-bordered w-full"
            disabled={isSubmitting || isUploading || researchArea.length === 0}
          >
            <option disabled value="default">
              Select an item
            </option>
            {researchArea.map((Area, index) => (
              <option key={index} value={Area.departmentName}>
                {Area.departmentName}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500">Please select a research area</span>
          )}
        </div>

        {/* Research Details */}
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="details">
            Research details
          </label>
          <textarea
            id="details"
            {...register("details", { required: "details is required" })}
            rows="7"
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Write your Research details here"
            disabled={isSubmitting || isUploading}
          />
          {errors.details && (
            <span className="text-red-500">{errors.details.message}</span>
          )}
        </div>

        {/* Research Image */}
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="image">
            Research Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mt-2"
            disabled={isSubmitting || isUploading}
          />
          {error && !errors.image && (
            <span className="text-red-500">{error}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className={`btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full ${
            isSubmitting || isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting || isUploading ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing...
            </>
          ) : (
            "Submit Research"
          )}
        </button>
      </form>
    </div>
  );
};

export default WriteResearchPaper;
