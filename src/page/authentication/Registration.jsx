import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import loginBg from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Resizer from "react-image-file-resizer"; // Import Resizer

const Registration = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);

  // Show and hide password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Accessing environment variables
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  // Function to resize image
  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // File to resize
        800, // Max width
        800, // Max height
        "WEBP", // Output format
        75, // Quality (0-100)
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "file" // Output type
      );
    });

  const onSubmit = async (data) => {
    setDisabled(true);
    const { name, email, password, confirmPassword, image } = data;

    try {
      if (!cloud_name || !preset_key) {
        throw new Error("Cloudinary configuration is missing");
      }

      // Resize the image
      const file = image[0];
      const resizedImage = await resizeImage(file);

      // Upload resized image to Cloudinary
      const formData = new FormData();
      formData.append("file", resizedImage);
      formData.append("upload_preset", preset_key);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      const photoUrl = res.data.secure_url;

      if (password === confirmPassword) {
        // Create user with Firebase
        const userCredential = await createUser(email, password);
        const user = userCredential.user;

        // Update user profile
        await updateUserProfile(name, photoUrl);

        // Save user information in the database
        const userInfo = { name, email: user.email, photoUrl };
        const userRes = await axiosPublic.post("/users", userInfo);

        if (userRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
          scrollTo(0, 0);
        }
      } else {
        setErrorMessage("Password and confirm password should match");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <Helmet>
        <title>Service | Registration</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row lg:gap-48 md:gap-16">
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="card flex-1 shrink-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Registration Form Fields */}
            <p className="font-bold text-center lg:text-4xl md:text-3xl text-2xl md:mb-10 mb-5 text-dark-900 dark:text-white">
              <Typewriter
                words={[" Sign Up now"]}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </p>
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered bg-white text-dark-900"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex items-center">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  className="input input-bordered bg-white text-dark-900 w-full"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />
                <div
                  onClick={handelShowPassword}
                  className="absolute right-12 text-xl cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              {/* Error Messages */}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be at least 6 characters
                </span>
              )}
            </div>
            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="flex items-center">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Confirm Password"
                  className="input input-bordered bg-white text-dark-900 w-full"
                  {...register("confirmPassword", { required: true })}
                />
                <div
                  onClick={handelShowPassword}
                  className="absolute right-12 text-xl cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Image</span>
              </label>
              <input type="file" {...register("image", { required: true })} />
            </div>
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                disabled={disabled}
                type="submit"
                className="btn btn-warning btn-outline border-1 border-b-8"
              >
                Register Now
              </button>
            </div>
          </form>
          {/* Additional Options */}
          <div className="space-y-5">
            <p className="text-[#D1A054] text-lg text-center">
              Already registered?
              <span className="font-semibold">
                <Link to="/login">Go to log in</Link>
              </span>
            </p>
            <p className="text-center text-lg">Or sign in with</p>
            <div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
