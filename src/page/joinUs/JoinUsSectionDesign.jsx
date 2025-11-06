import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUsers from "../../hooks/useUser";

const MAX_DETAILS_LENGTH = 500;

const JoinUsSectionDesign = ({ data }) => {
  const { user } = useAuth();
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [researchArea, setResearchArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Select Research Area");
  const [selectedRole, setSelectedRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { qualifications, role, experience, internationalExposure } = data;
  const navigate = useNavigate();
  const location = useLocation();

  const [detailsText, setDetailsText] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [researchAreaError, setResearchAreaError] = useState("");

  useEffect(() => {
    axiosPublic.get("/researchArea").then((res) => {
      setResearchArea(res.data);
    });
  }, [axiosPublic]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openModal = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDetailsText("");
    setDetailsError("");
    setPdfError("");
    setResearchAreaError("");
  };

  const onSubmit = async (formData) => {
    setDetailsError("");
    setPdfError("");
    setResearchAreaError("");

    // Validate details length
    if (detailsText.length > MAX_DETAILS_LENGTH) {
      setDetailsError(`Details cannot exceed ${MAX_DETAILS_LENGTH} characters`);
      return;
    }

    // Validate research area selection
    if (selectedArea === "Select Research Area") {
      setResearchAreaError("Please select a research area");
      return;
    }

    // Validate resume URL
    if (!formData.resume || formData.resume.trim() === "") {
      setPdfError("Please provide your resume URL");
      return;
    }

    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(formData.resume)) {
      setPdfError("Please provide a valid URL");
      return;
    }

    try {
      const applicationData = {
        name: formData.name,
        phone: formData.phone,
        university: formData.university,
        details: formData.details,
        email: user.email,
        researchArea: selectedArea,
        role: selectedRole,
        resume: formData.resume, // only URL
      };

      const res = await axiosSecure.post("/submitApplication", applicationData);

      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data?.message || "Application submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        closeModal();
      } else if (res.status === 208) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: res.data?.message || "Application already exists!",
          showConfirmButton: true,
        });
        closeModal();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: error?.response?.data?.error || error.message || "Try again",
      });
    }
  };

  return (
    <div className="md:p-10 md:m-10 p-2 m-2 rounded-lg shadow-md bg-white dark:bg-gray-950">
      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
        <div className="space-y-4">
          <p className="italic font-bold text-xl text-primary-700">{role}</p>
          <p className=" text-gray-800 dark:text-gray-100">
            <span className="font-bold text-lg">Qualifications:</span>{" "}
            {qualifications}
          </p>
          <p className=" text-gray-800 dark:text-gray-100">
            <span className="font-bold text-lg">Experience:</span> {experience}
          </p>
          <p className=" text-gray-800 dark:text-gray-100">
            <span className="font-bold text-lg">International Exposure:</span>{" "}
            {internationalExposure}
          </p>
        </div>

        <div>
          <button
            className="btn border-b-8 font-semibold text-primary-900 hover:text-white dark:text-primary-900 hover:border-primary-600 border-primary-700 dark:border-primary-900 dark:hover:border-primary-700 bg-primary-300 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-600 transition-all duration-200"
            onClick={() => {
              if (user) openModal(role);
              else navigate("/login", { state: { from: location } });
            }}
          >
            {user ? `Apply to be ${role}` : "Login to apply"}
          </button>

          {isModalOpen && (
            <dialog open className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg mb-4">
                  Apply for {selectedRole}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <label className="form-control">
                    <span className="label-text">Name</span>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      defaultValue={users.name || ""}
                      className="input input-bordered"
                    />
                    {errors.name && (
                      <span className="text-red-500">Name is required</span>
                    )}
                  </label>

                  <label className="form-control">
                    <span className="label-text">Phone Number</span>
                    <input
                      {...register("phone", { required: true })}
                      type="text"
                      defaultValue={users.phone || ""}
                      className="input input-bordered"
                    />
                    {errors.phone && (
                      <span className="text-red-500">Phone is required</span>
                    )}
                  </label>

                  <label className="form-control">
                    <span className="label-text">Email</span>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="input input-bordered"
                    />
                  </label>

                  <label className="form-control">
                    <span className="label-text">University Name</span>
                    <input
                      {...register("university", { required: true })}
                      type="text"
                      className="input input-bordered"
                    />
                    {errors.university && (
                      <span className="text-red-500">
                        University is required
                      </span>
                    )}
                  </label>

                  <label className="form-control">
                    <span className="label-text">Interested Research Area</span>
                    <select
                      className="select select-bordered"
                      onChange={(e) => setSelectedArea(e.target.value)}
                      required
                      defaultValue="Select Research Area"
                    >
                      <option disabled value="Select Research Area">
                        Select Research Area
                      </option>
                      {researchArea.map((area, index) => (
                        <option key={index} value={area.departmentName}>
                          {area.departmentName}
                        </option>
                      ))}
                    </select>
                    {researchAreaError && (
                      <span className="text-red-500">{researchAreaError}</span>
                    )}
                  </label>

                  <label className="form-control">
                    <span className="label-text">Details</span>
                    <textarea
                      className="textarea input-bordered"
                      {...register("details", {
                        required: true,
                        onChange: (e) => setDetailsText(e.target.value),
                      })}
                      value={detailsText}
                      maxLength={MAX_DETAILS_LENGTH}
                    ></textarea>
                    {errors.details?.type === "required" && (
                      <span className="text-red-500">Details is required</span>
                    )}
                    {detailsError && (
                      <span className="text-red-500">{detailsError}</span>
                    )}
                    <p className="text-sm text-gray-500">
                      {detailsText.length}/{MAX_DETAILS_LENGTH} characters
                    </p>
                  </label>

                  <label className="form-control">
                    <span className="label-text">Resume URL</span>
                    <input
                      {...register("resume", { required: true })}
                      type="url"
                      placeholder="https://drive.google.com/file/d/..."
                      className="input input-bordered w-full"
                    />
                    {errors.resume && (
                      <span className="text-red-500">
                        Resume URL is required
                      </span>
                    )}
                    {pdfError && (
                      <span className="text-red-500">{pdfError}</span>
                    )}
                    <p className="text-sm text-gray-500">
                      Please provide a Google Drive link. Make sure it is
                      publicly accessible.
                    </p>
                  </label>

                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="btn bg-primary-600 text-white flex gap-2"
                    >
                      <FaPaperPlane /> Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn bg-gray-500 text-white"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinUsSectionDesign;
