import { useState } from "react";
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Add Collaborator</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">University Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
            placeholder="e.g., Bangladesh University of Business and Technology"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">University Logo</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-warning btn-outline border-1 border-b-8"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Collaborator"}
        </button>
      </form>
    </div>
  );
};

export default AddCollaborator;
