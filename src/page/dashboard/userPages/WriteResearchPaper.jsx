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

// Visually hidden native date input to open system date picker
const HiddenDatePicker = ({ value, onChange, disabled }) => {
  return (
    <input
      id="_hidden_publication_date_input"
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute opacity-0 w-0 h-0 -z-10"
      aria-hidden="true"
      disabled={disabled}
      onKeyDown={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      inputMode="none"
    />
  );
};

// Button that triggers the hidden date input's picker
const CalendarTrigger = ({ disabled, onOpenPicker }) => {
  return (
    <button
      type="button"
      onClick={onOpenPicker}
      disabled={disabled}
      className="btn btn-outline btn-square"
      aria-label="Open date picker"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 7.5h15a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18V9a1.5 1.5 0 011.5-1.5z"
        />
      </svg>
    </button>
  );
};

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

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
    <div className="max-w-4xl mx-auto p-2 md:p-6 bg-white dark:bg-gray-950 text-gray-950 dark:text-white rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Write Research Paper</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="rounded-lg shadow md:p-6 p-2 space-y-6"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Research Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Enter Research title"
            disabled={isSubmitting || isUploading}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Publisher & DOI */}
        <div className="md:flex gap-6">
          <div className="mb-4 w-full">
            <label className="block font-semibold text-lg">Publisher</label>
            <input
              type="text"
              {...register("publisher", { required: "Publisher is required" })}
              className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
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
              className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
              placeholder="Enter DOI"
              disabled={isSubmitting || isUploading}
            />
            {errors.doi && <p className="text-red-500">{errors.doi.message}</p>}
          </div>
        </div>

        {/* Publication Date, Image & Category */}
        <div className="md:flex gap-4">
          {/* Left: Research Area */}
          <div className="mb-4 w-full">
            <label className="block font-semibold text-lg">Research Area</label>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
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
        {/* Right: Date + Image Upload */}
        <div className="mb-4 w-full">
          <label className="block font-semibold text-lg">
            Date of Publication
          </label>
          {/* Hidden form field for react-hook-form value/validation */}
          <input
            type="hidden"
            {...register("publicationDate", { required: "Date is required" })}
          />
          {/* Visually hidden date input just to open native picker */}
          <HiddenDatePicker
            disabled={isSubmitting || isUploading}
            value={watch("publicationDate") || ""}
            onChange={(value) =>
              setValue("publicationDate", value, { shouldValidate: true })
            }
          />
          {/* Controls row */}
          <div className="mt-3 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <CalendarTrigger
                disabled={isSubmitting || isUploading}
                onOpenPicker={() => {
                  const el = document.getElementById(
                    "_hidden_publication_date_input"
                  );
                  if (el && typeof el.showPicker === "function") {
                    el.showPicker();
                  } else if (el) {
                    el.focus();
                    el.click();
                  }
                }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {(watch("publicationDate") &&
                  new Date(watch("publicationDate")).toLocaleDateString()) ||
                  "Select a date"}
              </span>
            </div>
            <div className="w-full max-w-sm">
              <label className="block font-semibold text-lg">
                Research Image
              </label>
              <div className="mt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("research_image_input")?.click()
                  }
                  className="btn btn-outline btn-square"
                  disabled={isSubmitting || isUploading}
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
                  id="research_image_input"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isSubmitting || isUploading}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Research preview"
                    className="h-28 w-auto rounded-md border"
                  />
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {errors.publicationDate && (
            <p className="text-red-500 mt-2">
              {errors.publicationDate.message}
            </p>
          )}
        </div>

        {/* Authors */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Author</label>
          {AuthorFields.map((field, index) => (
            <input
              key={field.id}
              className="input input-bordered w-full my-2 bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
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
            Research Abstract
          </label>
          <textarea
            {...register("details", { required: "Details are required" })}
            rows="6"
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Describe your research Abstract"
            disabled={isSubmitting || isUploading}
          />
          {errors.details && (
            <p className="text-red-500">{errors.details.message}</p>
          )}
        </div>

        {/* Image Upload moved alongside Date of Publication */}

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
