import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const ContactForm = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);
  // TODO: save the data in the data base
  const onSubmit = async (data) => {
    const contactSMSInfo = { data };
    try {
      setIsSubmitting(true);
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sent",
      });

      if (result.isConfirmed) {
        const res = await axiosPublic.post("/contacts", contactSMSInfo);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message sent successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          throw new Error("Something wrong");
        }
      }
    } catch (error) {
      const errorMsg = "Failed to Sent message";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
      });
      console.error("Full error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="form-control w-full lg:px-16 md:px-10 px-5 mx-auto">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </label>
      <label className="form-control w-full lg:px-16 md:px-10 px-5 mx-auto">
        <div className="label">
          <span className="label-text">Phone number</span>
        </div>
        <input
          {...register("phone", { required: true })}
          type="text"
          placeholder="Phone number"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
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
          {...register("email", { required: !user?.email })}
          type="email"
          placeholder="Email address"
          defaultValue={user?.email || ""}
          disabled={!!user?.email}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
        />
        {errors.email && (
          <span className="text-red-500">Email address is required</span>
        )}
      </label>
      <div className="lg:px-16 md:px-10 px-5 mx-auto">
        <label>
          <div className="label">
            <span className="label-text">Type Your Message</span>
          </div>
          <textarea
            {...register("message", { required: true })}
            placeholder="Message"
            className="w-full lg:h-60 md:h-40 h-28 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          ></textarea>
          {errors.message && (
            <span className="text-red-500">Message is required</span>
          )}
        </label>
      </div>
      <div className="flex justify-center lg:px-16 md:px-10 px-5 mx-auto">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex gap-3 md:text-xl text-lg justify-center"
        >
          <FaPaperPlane />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
