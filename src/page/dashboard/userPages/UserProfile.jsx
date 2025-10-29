import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Resizer from "react-image-file-resizer";
import useAxiosPublic from "../../../hooks/useAxiosPublic.jsx";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useUsers from "../../../hooks/useUser.jsx";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaUser,
  FaUserTag,
} from "react-icons/fa";

const MAX_DETAILS_LENGTH = 500;

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [detailsCount, setDetailsCount] = useState(0);
  const [users, loading, refetchUsers] = useUsers();

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { logOut } = useAuth();

  // Fetch team info
  const {
    data: teamInfo,
    refetch: refetchTeam,
    isLoading: isTeamLoading,
    error: teamError,
  } = useQuery({
    queryKey: ["teamInfo", users?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/userInfoInTeam");
        return res.data; // Can be null if user not in team
      } catch (error) {
        // If 404 or user not in team, return null (not an error)
        if (error.response?.status === 404) {
          return null;
        }
        // For other errors, log and return null
        console.error("Error fetching team info:", error);
        return null;
      }
    },
    enabled: !!users?.email,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false, // Don't retry if user is not in team yet
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Watch form values for controlled inputs
  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedUniversity = watch("university");
  const watchedLinkedin = watch("linkedin");
  const watchedTwitter = watch("twitter");
  const watchedFacebook = watch("facebook");
  const watchedGithub = watch("github");
  const watchedDetails = watch("details");

  useEffect(() => {
    setDetailsCount(watchedDetails?.length || 0);
  }, [watchedDetails]);

  useEffect(() => {
    if (!users) return;

    const dateTime = teamInfo?.createdAt ? new Date(teamInfo.createdAt) : null;
    const date = dateTime
      ? dateTime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    const initialData = {
      name: users?.name || "",
      phone: teamInfo?.phone || "",
      university: teamInfo?.university || "",
      linkedin: teamInfo?.socialMedia?.linkedin || "",
      twitter: teamInfo?.socialMedia?.twitter || "",
      facebook: teamInfo?.socialMedia?.facebook || "",
      github: teamInfo?.socialMedia?.github || "",
      joinedOn: date || "",
      details: teamInfo?.details || "",
    };

    reset(initialData);
    setPreviewImage(users?.photoUrl || teamInfo?.image || "");
    setDetailsCount(initialData.details.length);
  }, [users, teamInfo, reset]);

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "WEBP",
        90,
        0,
        (uri) => resolve(uri),
        "file"
      );
    });

  const onSubmit = async (data) => {
    try {
      let photoUrl = users?.photoUrl;

      // Upload image if selected
      if (selectedFile) {
        Swal.fire({
          title: "Uploading image...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const resizedImage = await resizeImage(selectedFile);
        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);
        const res = await axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        photoUrl = res.data.secure_url;
      }

      const updateInfo = {
        email: users?.email,
        name: data.name,
        phone: data.phone,
        university: data.university,
        photoUrl,
        socialMedia: {
          linkedin: data.linkedin,
          twitter: data.twitter,
          facebook: data.facebook,
          github: data.github,
        },
        details: data.details,
      };

      const res = await axiosSecure.patch("/updateUserAndTeam", updateInfo);

      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message || "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Refetch both user and team data
        await Promise.all([refetchUsers(), refetchTeam()]);

        setIsEditing(false);
        setPreviewImage(photoUrl);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || "Failed to update profile",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (users) {
      const dateTime = teamInfo?.createdAt
        ? new Date(teamInfo.createdAt)
        : null;
      const date = dateTime
        ? dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";

      const originalData = {
        name: users?.name || "",
        phone: teamInfo?.phone || "",
        university: teamInfo?.university || "",
        linkedin: teamInfo?.socialMedia?.linkedin || "",
        twitter: teamInfo?.socialMedia?.twitter || "",
        facebook: teamInfo?.socialMedia?.facebook || "",
        github: teamInfo?.socialMedia?.github || "",
        joinedOn: date || "",
        details: teamInfo?.details || "",
      };
      reset(originalData);
    }
    setPreviewImage(users?.photoUrl || teamInfo?.image || "");
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select an image file",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image smaller than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "LogOut Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // Show loading state - wait for user data, team info can be null
  if (loading || !users) {
    return <Loading />;
  }

  // Prepare display data - handle cases where teamInfo might be null
  const displayData = {
    name: users?.name || "Not provided",
    email: users?.email || "Not provided",
    role: teamInfo?.role || users?.role || "Not provided",
    phone: teamInfo?.phone || "Not provided",
    university: teamInfo?.university || "Not provided",
    photoUrl: users?.photoUrl || teamInfo?.image || "",
    socialMedia: teamInfo?.socialMedia || {},
    joinedOn: teamInfo?.createdAt,
    details: teamInfo?.details || "",
  };

  const socialLinks = [
    {
      key: "linkedin",
      icon: FaLinkedin,
      label: "LinkedIn",
      color: "text-blue-700 hover:text-blue-900",
    },
    {
      key: "twitter",
      icon: FaTwitter,
      label: "Twitter",
      color: "text-blue-400 hover:text-blue-600",
    },
    {
      key: "facebook",
      icon: FaFacebook,
      label: "Facebook",
      color: "text-blue-600 hover:text-blue-800",
    },
    {
      key: "github",
      icon: FaGithub,
      label: "GitHub",
      color: "text-gray-800 hover:text-gray-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-t-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Personal Information</h1>
            <p className="text-primary-200">
              Manage your profile and personal details
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl p-6 md:p-8 -mt-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-500 shadow-lg">
                <img
                  src={
                    previewImage ||
                    displayData.photoUrl ||
                    "https://via.placeholder.com/200"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-3 rounded-full cursor-pointer hover:bg-primary-700 shadow-lg transform transition hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {displayData.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FaUserTag className="text-primary-600" />
                  <span>{displayData.role}</span>
                </div>
                {displayData.joinedOn && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Joined:{" "}
                      {format(new Date(displayData.joinedOn), "MMMM dd, yyyy")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaUser className="text-primary-600" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label="Name"
                  name="name"
                  icon={FaUser}
                  register={register}
                  errors={errors}
                  isEditing={isEditing}
                  value={isEditing ? watchedName : displayData.name}
                  required
                />
                <InfoField
                  label="Email"
                  name="email"
                  icon={FaEnvelope}
                  isEditing={false}
                  value={displayData.email}
                />
                <InfoField
                  label="Role"
                  name="role"
                  icon={FaUserTag}
                  isEditing={false}
                  value={displayData.role}
                />
                <InfoField
                  label="Phone"
                  name="phone"
                  icon={FaPhone}
                  register={register}
                  errors={errors}
                  isEditing={isEditing}
                  value={isEditing ? watchedPhone : displayData.phone}
                />
                <InfoField
                  label="University"
                  name="university"
                  icon={FaUniversity}
                  register={register}
                  errors={errors}
                  isEditing={isEditing}
                  value={isEditing ? watchedUniversity : displayData.university}
                  fullWidth
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-primary-600">🔗</span>
                Social Media
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map(({ key, icon: Icon, label, color }) => (
                  <SocialMediaField
                    key={key}
                    label={label}
                    name={key}
                    icon={Icon}
                    color={color}
                    register={register}
                    errors={errors}
                    isEditing={isEditing}
                    value={
                      isEditing ? watch(key) : displayData.socialMedia[key]
                    }
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About Me
              </h3>
              <div className="relative">
                {isEditing ? (
                  <textarea
                    className="w-full textarea textarea-bordered min-h-[200px] dark:bg-gray-800 dark:text-white"
                    {...register("details", {
                      maxLength: {
                        value: MAX_DETAILS_LENGTH,
                        message: `Details cannot exceed ${MAX_DETAILS_LENGTH} characters`,
                      },
                    })}
                    placeholder="Tell us about yourself..."
                    value={watchedDetails}
                  />
                ) : (
                  <div className="min-h-[200px] p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {displayData.details || (
                        <span className="text-gray-400 italic">
                          No details provided. Click Edit Profile to add
                          information about yourself.
                        </span>
                      )}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  {errors.details && (
                    <p className="text-red-500 text-sm">
                      {errors.details.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                    {detailsCount} / {MAX_DETAILS_LENGTH} characters
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="btn btn-primary text-white px-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-outline px-8"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="btn btn-primary text-white px-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={handelLogout}
                    className="btn btn-error text-white px-8"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Info Field Component
const InfoField = ({
  label,
  name,
  icon: Icon,
  register,
  errors,
  isEditing,
  value,
  required = false,
  fullWidth = false,
}) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-primary-600" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </div>
    </label>
    {isEditing && register ? (
      <>
        <input
          type={name === "email" ? "email" : "text"}
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
          className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          value={value || ""}
        />
        {errors && errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </>
    ) : (
      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
        <p className="text-gray-900 dark:text-white">
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </p>
      </div>
    )}
  </div>
);

// Social Media Field Component
const SocialMediaField = ({
  label,
  name,
  icon: Icon,
  color,
  register,
  errors,
  isEditing,
  value,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      <div className="flex items-center gap-2">
        <Icon className={color} />
        {label}
      </div>
    </label>
    {isEditing ? (
      <>
        <input
          {...register(name)}
          className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          placeholder={`https://${label.toLowerCase()}.com/username`}
          value={value || ""}
        />
        {errors && errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </>
    ) : value ? (
      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className={`${color} hover:underline truncate block`}
        >
          {value.replace(/^https?:\/\//, "")}
        </a>
      </div>
    ) : (
      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
        <span className="text-gray-400 italic">Not provided</span>
      </div>
    )}
  </div>
);

export default UserProfile;
