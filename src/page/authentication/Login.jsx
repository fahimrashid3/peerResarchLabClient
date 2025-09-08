import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import loginBg from "../../assets/others/authenticationBg.png";
import loginImg from "../../assets/others/authentication.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn, logOut } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // getting the path name when user navigate by privet route
  const form = location.state?.form?.pathname || "/";

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

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    signIn(email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        if (!user.emailVerified) {
          await logOut();
          setErrorMessage(
            "Please verify your email before logging in. Check your inbox for the verification link."
          );
          Swal.fire({
            icon: "warning",
            title: "Email Not Verified",
            text: "Please verify your email before logging in. Check your inbox for the verification link.",
            confirmButtonText: "OK",
          });
          return;
        }
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `welcome back ${user.displayName}`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(form, { replace: true });
        scrollTo(0, 0);
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        // ..
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Info */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <img src="/logoColoredPng.png" alt="Peer Research Lab" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Welcome back to our research community
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                "Connecting minds, advancing knowledge, building the future of
                research together."
              </p>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p>Access your research dashboard</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p>Continue your collaborations</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p>Stay updated with latest research</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                      At least 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500 text-sm">
                      Less than 16 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 text-sm">
                      Must include uppercase, lowercase, number, special
                      character
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Sign In
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

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  New here?{" "}
                  <Link
                    to="/registration"
                    className="font-semibold text-primary-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                  >
                    Create an account
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

export default Login;
