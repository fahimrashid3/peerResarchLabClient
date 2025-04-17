import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUsers from "../../hooks/useUser";

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
  };

  const onSubmit = async (formData) => {
    const formDataObj = new FormData();

    for (const key in formData) {
      if (key === "resume") {
        formDataObj.append(key, formData[key][0]);
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    formDataObj.append("email", user.email);
    formDataObj.append("researchArea", selectedArea);
    formDataObj.append("role", selectedRole);

    // TODO: prevent user to apply more then one application
    try {
      await axiosSecure
        .post("/submitApplication", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Application has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something went wrong",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

      reset();
      closeModal();
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="border p-10 m-10 rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
        <div className="space-y-4">
          <p className="italic font-semibold text-lg text-primary-800">
            {role}
          </p>
          <p>
            <span className="font-bold text-lg">Qualifications:</span>{" "}
            {qualifications}
          </p>
          <p>
            <span className="font-bold text-lg">Experience:</span> {experience}
          </p>
          <p>
            <span className="font-bold text-lg">International Exposure:</span>{" "}
            {internationalExposure}
          </p>
        </div>

        <div>
          <button
            className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
            onClick={() => {
              if (user) {
                openModal(role);
              } else {
                navigate("/login", { state: { from: location } });
              }
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
                    >
                      <option disabled selected>
                        Select Research Area
                      </option>
                      {researchArea.map((area, index) => (
                        <option key={index} value={area.departmentName}>
                          {area.departmentName}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="form-control">
                    <span className="label-text">Details</span>
                    <textarea
                      className="textarea input-bordered"
                      {...register("details", { required: true })}
                    ></textarea>
                    {errors.details && (
                      <span className="text-red-500">Details is required</span>
                    )}
                  </label>

                  <label className="form-control">
                    <span className="label-text">Upload Resume (PDF)</span>
                    <input
                      {...register("resume", { required: true })}
                      type="file"
                      accept=".pdf"
                      className="file-input file-input-bordered w-full"
                    />
                    {errors.resume && (
                      <span className="text-red-500">Resume is required</span>
                    )}
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
