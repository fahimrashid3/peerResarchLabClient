import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import useUsers from "../../hooks/useUser";
import Loading from "../../components/Loading";

const Application = () => {
  const { role } = useParams();
  const { user } = useAuth();
  const [users, loading] = useUsers();
  console.log(user);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="pt-24 max-w-7xl mx-auto min-h-screen space-y-5">
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
            className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full"
          >
            <FaPaperPlane />
            Sent Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Application;
