import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import useInfo from "../../../hooks/useInfo";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateInfo = () => {
  const [info, infoLoading, refetch] = useInfo();
  const [basicInfoEdit, setBasicInfoEdit] = useState(false);
  const [socialMediaEdit, setSocialMediaEdit] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: info,
  });

  if (infoLoading) {
    return <Loading />;
  }

  const { name, phone, email, location, socialMedia } = info;
  const { facebook, linkedIn, X, whatsApp } = socialMedia || {};

  const handleBasicInfoEdit = async (data) => {
    try {
      const res = await axiosSecure.patch("/basicInfo", data);
      if (res.data.success) {
        refetch();
        setBasicInfoEdit(false);
      }
    } catch (error) {
      console.error("Error updating basic info:", error);
    }
  };

  const handleSocialMediaEdit = async (data) => {
    try {
      const res = await axiosSecure.patch("/socialMedia", data.socialMedia);
      if (res.data.success) {
        refetch();
        setSocialMediaEdit(false);
      }
    } catch (error) {
      console.error("Error updating social media:", error);
    }
  };

  return (
    <div className="border rounded-lg max-w-4xl mx-auto space-y-10 md:space-y-24 pt-10 min-h-screen">
      {/* Basic Info */}
      <div className="text-center space-y-2 md:space-y-3">
        <form onSubmit={handleSubmit(handleBasicInfoEdit)}>
          {!basicInfoEdit ? (
            <div className="space-y-5">
              <h1 className="text-lg md:text-3xl font-bold text-primary-700">
                {name}
              </h1>
              <p className="text-lg md:text-xl">{phone}</p>
              <p className="text-lg md:text-xl">{email}</p>
              <p className="text-lg md:text-xl">{location}</p>
              <button
                type="button"
                onClick={() => setBasicInfoEdit(true)}
                className="btn btn-outline border-1 border-b-8"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <input
                {...register("name", { required: true })}
                defaultValue={name}
                className="input block w-[80%] md:w-[70%] mx-auto"
              />
              <input
                {...register("phone", { required: true })}
                defaultValue={phone}
                className="input block w-[80%] md:w-[70%] mx-auto"
              />
              <input
                {...register("email", { required: true })}
                defaultValue={email}
                className="input block w-[80%] md:w-[70%] mx-auto"
              />
              <input
                {...register("location", { required: true })}
                defaultValue={location}
                className="input block w-[80%] md:w-[70%] mx-auto"
              />
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => setBasicInfoEdit(false)}
                  className="btn btn-outline border-1 border-b-8"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline border-1 border-b-8"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Social Media */}
      <div className="mt-3 space-y-2 text-center">
        <p className="text-lg md:text-xl">Social Media Links</p>
        <form onSubmit={handleSubmit(handleSocialMediaEdit)}>
          {!socialMediaEdit ? (
            <div className="space-y-5">
              <a
                href={`https://wa.me/${whatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 text-blue-600 hover:underline"
              >
                <IoLogoWhatsapp /> <span>{whatsApp}</span>
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 text-blue-600 hover:underline"
              >
                <FaFacebookF /> <span>{facebook}</span>
              </a>
              <a
                href={X}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 text-blue-600 hover:underline"
              >
                <FaXTwitter /> <span>{X}</span>
              </a>
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 text-blue-600 hover:underline"
              >
                <FaLinkedinIn /> <span>{linkedIn}</span>
              </a>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setSocialMediaEdit(true)}
                  className="btn btn-outline border-1 border-b-8"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2 justify-center">
                <IoLogoWhatsapp />
                <input
                  {...register("socialMedia.whatsApp")}
                  defaultValue={whatsApp}
                  className="input w-[80%] md:w-[70%]"
                />
              </div>
              <div className="flex items-center gap-2 justify-center">
                <FaFacebookF />
                <input
                  {...register("socialMedia.facebook")}
                  defaultValue={facebook}
                  className="input w-[80%] md:w-[70%]"
                />
              </div>
              <div className="flex items-center gap-2 justify-center">
                <FaXTwitter />
                <input
                  {...register("socialMedia.X")}
                  defaultValue={X}
                  className="input w-[80%] md:w-[70%]"
                />
              </div>
              <div className="flex items-center gap-2 justify-center">
                <FaLinkedinIn />
                <input
                  {...register("socialMedia.linkedIn")}
                  defaultValue={linkedIn}
                  className="input w-[80%] md:w-[70%]"
                />
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => setSocialMediaEdit(false)}
                  className="btn btn-outline border-1 border-b-8"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline border-1 border-b-8"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;
