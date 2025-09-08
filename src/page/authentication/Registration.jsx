import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import loginBg from "../../assets/others/authenticationBg.png";
import loginImg from "../../assets/others/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Resizer from "react-image-file-resizer";

const Registration = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, updateUserProfile, sendVerificationEmail, logOut } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();

  // getting the path name when user navigate by privet route
  const form = location.state?.form?.pathname || "/";

  // Show and hide password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Password validation functions
  const getPasswordValidation = (pwd) => {
    return {
      length: pwd.length >= 6 && pwd.length <= 16,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$&.*]/.test(pwd),
    };
  };

  const passwordValidation = getPasswordValidation(password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

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
        try {
          // Create user with Firebase
          const userCredential = await createUser(email, password);
          const user = userCredential.user;

          // Update user profile
          await updateUserProfile(name, photoUrl);

          // Send email verification - add delay and better error handling
          try {
            await sendVerificationEmail();
            console.log("Verification email sent successfully");
          } catch (verificationError) {
            console.error(
              "Error sending verification email:",
              verificationError
            );
            // Continue with the flow even if verification email fails
          }

          Swal.fire({
            icon: "info",
            title: "Verification Email Sent",
            text: "Please check your email and verify your account before logging in.",
            timer: 4000,
          });

          // Add a small delay before logout to ensure email is sent
          setTimeout(async () => {
            await logOut();
            reset();
            navigate("/verify-email", { replace: true });
            scrollTo(0, 0);
          }, 1000);

          // Save user information in the database
          const userInfo = { name, email: user.email, photoUrl };
          await axiosPublic.post("/users", userInfo);
        } catch (error) {
          throw error;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 pt-24">
      <Helmet>
        <title>Peer Research Lab | Registration</title>
      </Helmet>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Info */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <img src="/logoColoredPng.png" alt="Peer Research Lab" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Join our research community
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                "Connecting minds, advancing knowledge, building the future of
                research together."
              </p>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p>Create your research profile</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p>Connect with researchers worldwide</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p>Collaborate on innovative projects</p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-2">
                  Sign Up
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Create your account to start collaborating
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      Name is required
                    </span>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    • Full name is required for your profile
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      Email is required
                    </span>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    • Valid email address is required for account verification
                  </p>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 16,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&.*])[A-Za-z\d!@#$&.*]{6,16}$/,
                        onChange: (e) => setPassword(e.target.value),
                      })}
                    />
                    <button
                      type="button"
                      onClick={handelShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 text-sm">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 text-sm">
                      Password must be at least 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500 text-sm">
                      Password must be less than 16 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 text-sm">
                      Password must include uppercase, lowercase, number, and
                      special character
                    </span>
                  )}
                  {password && (
                    <div className="text-xs space-y-1">
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Password Requirements:
                      </p>
                      <div
                        className={`flex items-center ${
                          passwordValidation.length
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.length ? "✓" : "✗"}
                        </span>
                        <span>6-16 characters</span>
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordValidation.uppercase
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.uppercase ? "✓" : "✗"}
                        </span>
                        <span>One uppercase letter (A-Z)</span>
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordValidation.lowercase
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.lowercase ? "✓" : "✗"}
                        </span>
                        <span>One lowercase letter (a-z)</span>
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordValidation.number
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.number ? "✓" : "✗"}
                        </span>
                        <span>One number (0-9)</span>
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordValidation.special
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.special ? "✓" : "✗"}
                        </span>
                        <span>One special character (!@#$&.*)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      {...register("confirmPassword", {
                        required: true,
                        onChange: (e) => setConfirmPassword(e.target.value),
                      })}
                    />
                    <button
                      type="button"
                      onClick={handelShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500 text-sm">
                      Confirm Password is required
                    </span>
                  )}
                  {errorMessage && (
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  )}
                  {confirmPassword && (
                    <div className="text-xs">
                      <div
                        className={`flex items-center ${
                          password === confirmPassword
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span className="mr-2">
                          {password === confirmPassword ? "✓" : "✗"}
                        </span>
                        <span>Passwords match</span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    • Must match the password above
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-600 dark:file:text-primary-300"
                  />
                </div>

                {/* Submit Button */}
                <button
                  disabled={disabled}
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {disabled ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Additional Options */}
              <div className="mt-8 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SocialLogin />

                <p className="text-center text-sm text-primary-600 dark:text-primary-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-primary-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
