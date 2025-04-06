import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import useUsers from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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

    try {
      await axiosSecure.post("/submitApplication", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
      closeModal();
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="border p-10 m-10 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="italic font-semibold">{role}</p>
          <p>
            <span className="font-bold text-lg">Qualifications:</span>
            {qualifications}
          </p>
          <p>
            <span className="font-bold text-lg">Experience:</span> {experience}
          </p>
          <p>
            <span className="font-bold text-lg">International Exposure :</span>{" "}
            {internationalExposure}
          </p>
        </div>
        <div>
          <button
            className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
            onClick={() => openModal(role)}
          >
            Apply to be {role}
          </button>

          {isModalOpen && (
            <dialog open className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Apply for {selectedRole}</h3>
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
                      defaultValue={user.email}
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
                        University name is required
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
                    <span className="label-text">Description</span>
                    <textarea
                      className="textarea input-bordered"
                      {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && (
                      <span className="text-red-500">
                        Description is required
                      </span>
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
