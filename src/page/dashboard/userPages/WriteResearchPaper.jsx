import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import Loading from "../../../components/Loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

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
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [researchArea, setResearchArea] = useState([]);

  useEffect(() => {
    axiosPublic.get("/researchArea").then((res) => {
      setResearchArea(res.data);
    });
  }, [axiosPublic]);

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
    console.log(data);
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

        const newResearch = {
          title: data.title,
          details: data.details,
          category: data.category,
          image: photoUrl, // Save the Cloudinary image URL
        };
        // post Research to database
        axiosSecure.post("/Research", newResearch).then((res) => {
          console.log(res);
          if (res.data.insertedId) {
            navigate("/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Research post successfully ",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
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
      <h2 className="text-2xl font-bold mb-4">Research Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="label-text">researchArea</span>
          </label>
          <select
            defaultValue="default"
            {...register("category", { required: true })}
            className="select select-bordered w-full"
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
        </div>
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
          />
          {errors.details && (
            <span className="text-red-500">{errors.details.message}</span>
          )}
        </div>

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
          />
        </div>
        <button
          type="submit"
          className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full"
        >
          Submit Research
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default WriteResearchPaper;
