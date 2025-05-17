import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUser";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";
import Loading from "../../../components/Loading";

const EditPaper = () => {
  const axiosSecure = useAxiosSecure();
  const [users, loading] = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const paper = location.state?.paper;

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [researchArea, setResearchArea] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {},
  });

  const { fields: AuthorFields, append: addAuthor } = useFieldArray({
    control,
    name: "author",
  });

  useEffect(() => {
    if (paper) {
      // Ensure authors exist and are an array
      const preparedPaper = {
        ...paper,
        author: Array.isArray(paper.author) ? paper.author : [paper.author],
      };
      reset(preparedPaper);
    }
  }, [paper, reset]);

  useEffect(() => {
    axiosSecure
      .get("/researchArea")
      .then((res) => setResearchArea(res.data))
      .catch((err) => {
        console.error("Error fetching research areas:", err);
        setError("Failed to load research areas");
      });
  }, [axiosSecure]);

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
      setIsUploading(true);
      setError(null);

      let imageUrl = paper.image; // Default to existing image

      if (image) {
        // Upload new image to Cloudinary
        const resizedImage = await resizeFile(image);
        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const updatedPaper = {
        _id: paper._id,
        title: data.title,
        publisher: data.publisher,
        doi: data.doi,
        publicationDate: data.publicationDate,
        category: data.category,
        authors: data.author.filter((a) => a?.trim() !== ""),
        details: data.details,
        authorEmail: users?.email,
        image: imageUrl,
        createdAt: paper.createdAt,
      };

      const res = await axiosSecure.patch("/EditPaper", updatedPaper);

      if (res.data.result.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Research updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/pendingPaper");
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
      <h2 className="text-2xl font-bold mb-4">Edit Research Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Research Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md"
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
          <label className="block font-semibold text-lg">Author(s)</label>
          {AuthorFields.map((field, index) => (
            <input
              key={field.id}
              className="input input-bordered w-full my-2"
              placeholder="Author Name"
              {...register(`author.${index}`)}
            />
          ))}
          <button
            type="button"
            onClick={() => addAuthor("")}
            className="btn btn-sm btn-outline"
          >
            Add Author
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
          {!image && paper?.image && (
            <div className="mt-2">
              <img
                src={paper.image}
                alt="Current"
                className="w-32 h-32 object-cover rounded-md"
              />
              <p className="text-sm text-gray-500">Current Image</p>
            </div>
          )}
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
            "Update Research"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditPaper;
