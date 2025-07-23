import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import loginBg from "../../assets/others/authenticationBg.png";
import loginImg from "../../assets/others/authentication.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn, logOut } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // getting the path name when user navigate by privet route
  const form = location.state?.form?.pathname || "/";

  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="hero-content flex-col md:flex-row-reverse lg:gap-48 md:gap-16 w-full px-4">
        {/* Left Image Section */}
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="Login" />
        </div>

        {/* Form Section */}
        <div className="w-full md:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
            <p className="font-bold text-center lg:text-4xl md:text-3xl text-2xl md:mb-10 mb-5 text-dark-900 dark:text-white">
              <Typewriter
                words={["Welcome Back", "Sign In now"]}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </p>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered w-full text-dark-900"
              />
              {errors.email && (
                <span className="text-red-500">Email required</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full text-dark-900"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />
                <div
                  onClick={handelShowPassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">At least 6 characters</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500">Less than 16 characters</span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Must include uppercase, lowercase, number, special character
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-warning btn-outline border-1 border-b-8 w-full"
              >
                Login Now
              </button>
            </div>
          </form>

          {/* Links Section */}
          <div className="space-y-5 mt-4">
            <p className="text-[#D1A054] text-lg text-center">
              New here?
              <span className="font-semibold">
                <Link to="/registration"> Create an account</Link>
              </span>
            </p>
            <p className="text-center text-lg">Or sign in with</p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
