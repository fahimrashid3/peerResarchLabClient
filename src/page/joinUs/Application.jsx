import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import useUsers from "../../hooks/useUser";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Application = () => {
  const { role } = useParams();
  const { user } = useAuth();
  const [users, loading] = useUsers();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(user);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        email: user?.email,
        role,
      };

      const res = await axiosSecure.post("/submitApplication", payload);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: res.data?.message || "Application submitted successfully!",
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });
      } else if (res.status === 208) {
        Swal.fire({
          icon: "warning",
          title: res.data?.message || "Application already exists!",
          text: "You cannot submit more than one application.",
        });
      }
    } catch (error) {
      const status = error?.response?.status;
      const serverMsg = error?.response?.data?.error;

      if (status === 400) {
        Swal.fire({
          icon: "error",
          title: serverMsg || "Resume URL and name are required",
        });
      } else if (status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Please login again to continue.",
        });
      } else if (status === 403) {
        Swal.fire({
          icon: "error",
          title: "Forbidden access",
          text: "You are not allowed to submit this application.",
        });
      } else if (status === 500) {
        Swal.fire({
          icon: "error",
          title: "Internal Server Error",
          text: "Please try again later.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: serverMsg || "Failed to submit application",
        });
      }

      console.error("Submit application error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="pt-24 max-w-7xl mx-auto min-h-screen bg-primary-500 space-y-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full lg:px-16 md:px-10 px-5 mx-auto">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            value={users.name}
            className="input input-bordered w-full "
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </label>
        <label className="form-control w-full lg:px-16 md:px-10 px-5 mx-auto">
          <div className="label">
            <span className="label-text">Phone number</span>
          </div>
          <input
            {...register("phone", { required: true })}
            type="text"
            placeholder="Phone number"
            value={users.phone}
            className="input input-bordered w-full "
          />
          {errors.phone && (
            <span className="text-red-500">Phone number is required</span>
          )}
        </label>
        <label className="form-control w-full lg:px-16 md:px-10 px-5 mx-auto">
          <div className="label">
            <span className="label-text">Email address</span>
          </div>
          <input
            disabled
            {...register("email")}
            type="email"
            placeholder="Email address"
            value={user.email}
            className="input input-bordered w-full "
          />
          {errors.email && (
            <span className="text-red-500">Email address is required</span>
          )}
        </label>

        <div className="flex justify-center lg:px-16 md:px-10 px-5 mx-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full"
          >
            <FaPaperPlane />
            {isSubmitting ? "Submitting..." : "Sent Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Application;
