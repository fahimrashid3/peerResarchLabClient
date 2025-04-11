import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  // TODO: save the data in the data base
  const onSubmit = async (data) => {
    const contactSMSInfo = data;
    console.log(contactSMSInfo);
    try {
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
        const res = await axiosSecure.post("/contacts", contactSMSInfo);
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
    }
  };
  if (!user) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

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
          className="input input-bordered w-full "
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
      <div className="lg:px-16 md:px-10 px-5 mx-auto">
        <label>
          <div className="label">
            <span className="label-text">Type Your Message</span>
          </div>
          <textarea
            {...register("message", { required: true })}
            placeholder="Message"
            className="w-full textarea textarea-bordered lg:h-60 md:h-40 h-28"
          ></textarea>
          {errors.message && (
            <span className="text-red-500">Message is required</span>
          )}
        </label>
      </div>
      <div className="flex justify-center lg:px-16 md:px-10 px-5 mx-auto">
        <button
          type="submit"
          className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full"
        >
          <FaPaperPlane />
          Sent Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
