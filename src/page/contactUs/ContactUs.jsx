import React from "react";
// import SectionTitle from "../../components/SectionTitle";
import ContactForm from "./ContactForm";
import { FaFacebookF, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import useInfo from "../../hooks/useInfo";
import Loading from "../../components/Loading";
import { IoLogoWhatsapp } from "react-icons/io5";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [info, infoLoading] = useInfo();

  // ✅ Ensure info and labInformation exist before destructuring
  if (infoLoading || !info || !info) {
    return <Loading />;
  }

  const { phone, socialMedia, location } = info;
  const { facebook, linkedIn, X, whatsApp } = socialMedia;
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Phone number copy",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="pt-10  dark:bg-dark-700 rounded-lg text-dark-900 dark:text-white ">
      <div className="mt-6 md:mt-10">
        {/* <SectionTitle heading="Contact Form" subHeading="Send Us a Message" /> */}
        <div className="py-5 md:py-14 lg:py-20 space-y-5 md:flex md:flex-row-reverse">
          <div className="flex-1 pl-10">
            <div className="max-w-md space-y-6 text-gray-800">
              {/* Chat Section */}
              <div>
                <h3 className="font-semibold text-lg">Chat with us</h3>
                <p className="text-sm text-gray-600 text-justify">
                  Welcome to our contact page! We're delighted to connect with
                  you. Whether you have a question, feedback, or simply want to
                  say hello, this is the place to reach out. Our dedicated team
                  is ready to assist you and provide the information you need.
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                    // href={`https://wa.me/${whatsApp}`}
                    href={`${whatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp />
                    <span>Start a shat's app chat</span>
                  </a>
                  <a
                    className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                    href={`${facebook}`}
                    target="_blank"
                  >
                    <FaFacebookF />

                    <span>Contact by facebook</span>
                  </a>
                  <a
                    className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                    href={`${X}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter />
                    <span>Message us on X</span>
                  </a>
                  <a
                    className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                    href={`${linkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                    <span>Message us on LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Call Section */}
              <div>
                <h3 className="font-semibold text-lg">Call us</h3>
                <p className="text-sm text-gray-600">
                  Call our team Mon-Fri from 8am to 5pm.
                </p>
                <div onClick={() => handleCopy(phone)} className="mt-3">
                  <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
                    <FaPhone />
                    <span>{phone}</span>
                  </div>
                </div>
              </div>

              {/* Visit Section */}
              <div>
                <h3 className="font-semibold text-lg">Visit us</h3>
                <p className="text-sm text-gray-600">
                  Chat to us in person at our office.
                </p>
                <div className="mt-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                  >
                    <FaMapMarkerAlt />
                    <span>{location}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-dark-200 rounded-lg p-5 md:bg-transparent md:rounded-none md:p-0">
            <h1 className="font-semibold text-xl pl-5">Sent a message</h1>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
