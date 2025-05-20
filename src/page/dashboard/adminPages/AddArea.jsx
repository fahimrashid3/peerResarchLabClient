import { useForm, useFieldArray } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const AddArea = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
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
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Add Research Area</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Department Name */}
        <div className="mb-4">
          <label className="block font-semibold text-lg">Department Name</label>
          <input
            type="text"
            {...register("departmentName", {
              required: "Department name is required",
            })}
            className="w-full p-2 mt-2 border rounded-md"
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
            className="w-full p-2 mt-2 border rounded-md"
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
              className="mb-4 border p-4 rounded-md bg-gray-50"
            >
              <input
                {...register(`subDepartments.${index}.name`, {
                  required: "Name is required",
                })}
                placeholder="Sub-department Name"
                className="input input-bordered w-full mb-2"
              />
              <textarea
                {...register(`subDepartments.${index}.description`, {
                  required: "Description is required",
                })}
                placeholder="Sub-department Description"
                rows="3"
                className="textarea textarea-bordered w-full"
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2"
            disabled={isSubmitting || isUploading}
          />
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
