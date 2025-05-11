import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
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
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [researchArea, setResearchArea] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { fields: AuthorFields, append: addAuthor } = useFieldArray({
    control,
    name: "author",
  });

  useEffect(() => {
    axiosPublic
      .get("/researchArea")
      .then((res) => setResearchArea(res.data))
      .catch((err) => {
        console.error("Error fetching research areas:", err);
        setError("Failed to load research areas");
      });
  }, [axiosPublic]);

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

      // Resize and upload image to Cloudinary
      const resizedImage = await resizeFile(image);
      const formData = new FormData();
      formData.append("file", resizedImage);
      formData.append("upload_preset", preset_key);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      // Create new research object
      const newResearch = {
        title: data.title,
        publisher: data.publisher,
        doi: data.doi,
        publicationDate: data.publicationDate,
        category: data.category,
        authors: data.author?.filter((a) => a.trim() !== "") || [],
        details: data.details,
        authorEmail: users?.email,
        image: cloudinaryRes.data.secure_url,
        createdAt: new Date().toISOString(),
      };
      console.log(newResearch);

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
        navigate("/");
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

  if (loading) return <Loading />;

  return (
    <div className="mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Research Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Research Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Enter Research title"
            disabled={isSubmitting || isUploading}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Publisher & DOI */}
        <div className="md:flex gap-4">
          <div className="mb-4 w-full">
            <label className="block font-semibold text-lg">Publisher</label>
            <input
              type="text"
              {...register("publisher", { required: "Publisher is required" })}
              className="w-full p-2 mt-2 border rounded-md"
              placeholder="Enter Publisher"
              disabled={isSubmitting || isUploading}
            />
            {errors.publisher && (
              <p className="text-red-500">{errors.publisher.message}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label className="block font-semibold text-lg">DOI</label>
            <input
              type="text"
              {...register("doi", { required: "DOI is required" })}
              className="w-full p-2 mt-2 border rounded-md"
              placeholder="Enter DOI"
              disabled={isSubmitting || isUploading}
            />
            {errors.doi && <p className="text-red-500">{errors.doi.message}</p>}
          </div>
        </div>

        {/* Publication Date & Category */}
        <div className="md:flex gap-4">
          <div className="mb-4 w-full">
            <label className="block font-semibold text-lg">
              Date of Publication
            </label>
            <input
              type="date"
              {...register("publicationDate", { required: "Date is required" })}
              className="w-full p-2 mt-2 border rounded-md"
              disabled={isSubmitting || isUploading}
            />
            {errors.publicationDate && (
              <p className="text-red-500">{errors.publicationDate.message}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label className="block font-semibold text-lg">Research Area</label>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full"
              disabled={isSubmitting || isUploading}
            >
              <option disabled value="default">
                Select an item
              </option>
              {researchArea.map((area, index) => (
                <option key={index} value={area.departmentName}>
                  {area.departmentName}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">Please select a research area</p>
            )}
          </div>
        </div>

        {/* Authors */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Author</label>
          {AuthorFields.map((field, index) => (
            <input
              key={field.id}
              className="input input-bordered w-full my-2"
              placeholder="author"
              {...register(`author.${index}`)}
            />
          ))}
          <button
            type="button"
            onClick={() => addAuthor("")}
            className="btn btn-sm btn-outline"
          >
            Add More
          </button>
        </div>

        {/* Details */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">
            Research Details
          </label>
          <textarea
            {...register("details", { required: "Details are required" })}
            rows="6"
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Describe your research"
            disabled={isSubmitting || isUploading}
          />
          {errors.details && (
            <p className="text-red-500">{errors.details.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Research Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mt-2"
            disabled={isSubmitting || isUploading}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="btn w-full text-white bg-primary-600 hover:bg-primary-700"
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
