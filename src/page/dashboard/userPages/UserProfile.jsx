import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUsers from "../../../hooks/useUser";
import Loading from "../../../components/Loading.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Resizer from "react-image-file-resizer";
import useAxiosPublic from "../../../hooks/useAxiosPublic.jsx";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const MAX_DETAILS_LENGTH = 500;

const UserProfile = () => {
  const [user] = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [detailsCount, setDetailsCount] = useState(0);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { logOut } = useAuth();

  // Restore teamInfo useQuery
  const {
    data: teamInfo,
    refetch,
    isLoading: isTeamLoading,
  } = useQuery({
    queryKey: ["teamInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/userInfoInTeam");
      return res.data;
    },
    enabled: !!user?.email,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  // Watch details field to update character count live
  const watchedDetails = watch("details", "");
  const watchedName = watch("name", "");
  const watchedPhone = watch("phone", "");
  const watchedUniversity = watch("university", "");
  const watchedLinkedin = watch("linkedin", "");
  const watchedTwitter = watch("twitter", "");
  const watchedFacebook = watch("facebook", "");
  const watchedGithub = watch("github", "");

  useEffect(() => {
    setDetailsCount(watchedDetails.length);
  }, [watchedDetails]);

  useEffect(() => {
    if (!user || !teamInfo) return;

    const dateTime = new Date(teamInfo.createdAt);

    const date = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const initialData = {
      name: user?.name || "",
      phone: user?.phone || teamInfo?.phone || "",
      university: teamInfo?.university || "",
      linkedin: teamInfo?.socialMedia?.linkedin || "",
      twitter: teamInfo?.socialMedia?.twitter || "",
      facebook: teamInfo?.socialMedia?.facebook || "",
      github: teamInfo?.socialMedia?.github || "",
      joinedOn: date || "",
      details: teamInfo?.details || "",
    };

    reset(initialData);
    setPreviewImage(user?.photoUrl || teamInfo?.image || "");
    setDetailsCount(initialData.details.length);
  }, [user, teamInfo, reset]);

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
      let photoUrl = user?.photoUrl;
      if (selectedFile) {
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
        email: user?.email,
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
        refetch();
        setIsEditing(false);
        setPreviewImage(photoUrl);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || "Failed to update profile",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCancel = () => {
    reset();
    setPreviewImage(user?.photoUrl || teamInfo?.image || "");
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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

  if (!user || isTeamLoading) return <Loading />;

  const displayData = {
    name: user?.name || teamInfo?.name,
    email: user?.email || teamInfo?.email,
    role: teamInfo?.role,
    phone: teamInfo?.phone,
    university: teamInfo?.university,
    // Always use user.photoUrl as main source, fallback to teamInfo.image
    photoUrl: user?.photoUrl || teamInfo?.image,
    socialMedia: teamInfo?.socialMedia || {},
    joinedOn: teamInfo?.createdAt,
    details: teamInfo?.details,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-dark-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-dark-900 dark:text-white">
        Personal Information
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={previewImage || displayData.photoUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700">
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
      </div>
      <p className="text-center mt-4 text-dark-900 dark:text-white">
        Joined on:{" "}
        {displayData.joinedOn
          ? format(new Date(displayData.joinedOn), "MMMM dd, yyyy")
          : "Date not available"}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ProfileField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          isEditing={isEditing}
          value={isEditing ? watchedName : displayData.name}
        />
        <ProfileField
          label="Role"
          name="role"
          isEditing={false}
          value={displayData.role}
        />
        <ProfileField
          label="Email"
          name="email"
          isEditing={false}
          value={displayData.email}
        />
        <ProfileField
          label="Phone"
          name="phone"
          register={register}
          errors={errors}
          isEditing={isEditing}
          value={isEditing ? watchedPhone : displayData.phone}
        />
        <ProfileField
          label="University"
          name="university"
          register={register}
          errors={errors}
          isEditing={isEditing}
          value={isEditing ? watchedUniversity : displayData.university}
        />

        <div className="space-y-4 pt-4">
          <h3 className="font-semibold text-lg border-b pb-2 text-dark-900 dark:text-white">
            Social Media
          </h3>
          <SocialMediaField
            label="LinkedIn"
            name="linkedin"
            register={register}
            errors={errors}
            isEditing={isEditing}
            value={
              isEditing ? watchedLinkedin : displayData.socialMedia.linkedin
            }
          />
          <SocialMediaField
            label="Twitter"
            name="twitter"
            register={register}
            errors={errors}
            isEditing={isEditing}
            value={isEditing ? watchedTwitter : displayData.socialMedia.twitter}
          />
          <SocialMediaField
            label="Facebook"
            name="facebook"
            register={register}
            errors={errors}
            isEditing={isEditing}
            value={
              isEditing ? watchedFacebook : displayData.socialMedia.facebook
            }
          />
          <SocialMediaField
            label="GitHub"
            name="github"
            register={register}
            errors={errors}
            isEditing={isEditing}
            value={isEditing ? watchedGithub : displayData.socialMedia.github}
          />
          <div className="border-b pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-justify gap-2 md:gap-5">
              <span className="font-semibold">Details</span>
              {isEditing && register ? (
                <textarea
                  className="flex-1 textarea textarea-xl w-full h-64 textarea-bordered"
                  {...register("details")}
                  value={watchedDetails}
                  maxLength={MAX_DETAILS_LENGTH}
                />
              ) : (
                <span
                  className={
                    !displayData.details
                      ? "text-dark-900 dark:text-gray-500"
                      : ""
                  }
                >
                  {displayData.details || `No details provided`}
                </span>
              )}
            </div>
            <div className="text-right text-sm text-dark-900 dark:text-gray-500 mt-1">
              {detailsCount} / {MAX_DETAILS_LENGTH} characters
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 pt-6">
          {isEditing && (
            <>
              <button
                type="submit"
                className="
                    btn border-b-8 font-semibold
                     text-primary-900 hover:text-white dark:text-primary-900
                     hover:border-primary-600 border-primary-700  dark:border-primary-900 dark:hover:border-primary-700 
                     bg-primary-300 hover:bg-primary-500  dark:bg-primary-400 dark:hover:bg-primary-600 
                     transition-all duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>

      <div className="flex justify-center gap-4 pt-6">
        {!isEditing && (
          <>
            <button
              type="button"
              onClick={handleEditClick}
              className="
              btn border-b-8 font-semibold
               text-primary-900 hover:text-white dark:text-primary-900
               hover:border-primary-600 border-primary-700  dark:border-primary-900 dark:hover:border-primary-700 
               bg-primary-300 hover:bg-primary-500  dark:bg-primary-400 dark:hover:bg-primary-600 
               transition-all duration-200"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={handelLogout}
              className="btn btn-outline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ProfileField: controlled input for edit mode
const ProfileField = ({ label, name, register, errors, isEditing, value }) => (
  <div className="border-b pb-2">
    <div className="flex justify-between items-center  text-justify">
      <span className="font-semibold pr-5">{label}</span>
      {isEditing && register ? (
        <input
          type={name === "joinedOn" ? "date" : "text"}
          {...register(name)}
          className="flex-1 max-w-xs input input-bordered ml-4"
          value={value}
        />
      ) : (
        <span className={!value ? "text-dark-900 dark:text-gray-500" : ""}>
          {value || `No ${label.toLowerCase()} provided`}
        </span>
      )}
    </div>
    {errors && errors[name] && (
      <p className="text-red-500 text-sm text-right mt-1">
        {errors[name].message}
      </p>
    )}
  </div>
);

// SocialMediaField: controlled input for edit mode
const SocialMediaField = ({
  label,
  name,
  register,
  errors,
  isEditing,
  value,
}) => (
  <div className="flex items-center">
    <span className="w-24 font-medium">{label}</span>
    {isEditing ? (
      <input
        {...register(name)}
        className="flex-1 input input-bordered"
        placeholder={`https://${label.toLowerCase()}.com/username`}
        value={value}
      />
    ) : value ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline truncate"
      >
        {value.replace(/^https?:\/\//, "")}
      </a>
    ) : (
      <span className="text-gray-500">Not provided</span>
    )}
  </div>
);

export default UserProfile;
