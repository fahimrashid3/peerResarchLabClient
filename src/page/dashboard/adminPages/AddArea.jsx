import { useForm, useFieldArray } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddArea = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    fields: subFields,
    append: addSub,
    remove: removeSub,
  } = useFieldArray({
    control,
    name: "subDepartments",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      setUploadError(null);
    }
  };

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", preset_key);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);

      // Upload image
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary();
      }

      // Construct final data
      const payload = {
        departmentName: data.departmentName,
        details: data.details,
        image: imageUrl,
        subDepartments: data.subDepartments,
      };

      console.log(payload);
      // Send to backend
      const res = await axiosSecure.post("/researchArea", payload);
      console.log(res);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New research area added successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/researchAreas");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto md:p-6 p-2 bg-white dark:bg-gray-950 text-gray-950 dark:text-white rounded-lg shadow border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-4">Add Research Area</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        {/* Department Name */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Department Name</label>
          <input
            type="text"
            {...register("departmentName", {
              required: "Department name is required",
            })}
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Enter department name"
            disabled={isSubmitting || isUploading}
          />
          {errors.departmentName && (
            <p className="text-red-500">{errors.departmentName.message}</p>
          )}
        </div>

        {/* Details */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">
            Description / Abstract
          </label>
          <textarea
            {...register("details", { required: "Description is required" })}
            rows="6"
            className="w-full p-2 mt-2 border rounded-md bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
            placeholder="Describe the research area"
            disabled={isSubmitting || isUploading}
          />
          {errors.details && (
            <p className="text-red-500">{errors.details.message}</p>
          )}
        </div>

        {/* Sub-Departments */}
        <div className="mb-6">
          <label className="block font-semibold text-lg mb-2">
            Sub-Departments
          </label>
          {subFields.map((field, index) => (
            <div
              key={field.id}
              className="mb-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
            >
              <input
                {...register(`subDepartments.${index}.name`, {
                  required: "Name is required",
                })}
                placeholder="Sub-department Name"
                className="input input-bordered w-full mb-2 bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
              />
              <textarea
                {...register(`subDepartments.${index}.description`, {
                  required: "Description is required",
                })}
                placeholder="Sub-department Description"
                rows="3"
                className="textarea textarea-bordered w-full bg-white dark:bg-gray-900 text-gray-950 dark:text-white border-gray-300 dark:border-gray-700"
              />
              <button
                type="button"
                className="btn btn-sm btn-error mt-2"
                onClick={() => removeSub(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addSub({ name: "", description: "" })}
            className="btn btn-outline btn-sm"
          >
            Add Sub-Department
          </button>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">
            Department Image
          </label>
          <div className="mt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                document.getElementById("area_image_input")?.click()
              }
              className="btn btn-outline btn-square"
              aria-label="Add image"
              title="Add image"
              disabled={isSubmitting || isUploading}
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
              id="area_image_input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isSubmitting || isUploading}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Department preview"
                className="h-28 w-auto rounded-md border"
              />
            )}
          </div>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="btn w-full text-white bg-primary-600 hover:bg-primary-700"
        >
          {isSubmitting || isUploading ? (
            <>
              <span className="loading loading-spinner"></span> Processing...
            </>
          ) : (
            "Submit Area"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddArea;
