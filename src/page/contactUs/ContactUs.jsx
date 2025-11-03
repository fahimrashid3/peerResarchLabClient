import React from "react";
import { Helmet } from "react-helmet";
// import SectionTitle from "../../components/SectionTitle";
import ContactForm from "./ContactForm";
import { FaFacebookF, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import useInfo from "../../hooks/useInfo";
import Loading from "../../components/Loading";
import { IoLogoWhatsapp } from "react-icons/io5";
import Swal from "sweetalert2";
import { HiOutlineMail } from "react-icons/hi";

const ContactUs = () => {
  const [info, infoLoading] = useInfo();

  if (infoLoading || !info || !info) {
    return <Loading />;
  }

  const { phone, socialMedia, location, email } = info;
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-2 md:p-5 lg:p-10 text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>Contact Us - Peer Research Lab</title>
        <meta
          name="description"
          content="Get in touch with Peer Research Lab. Contact us via phone, email, social media, or visit our office. We're here to help with your research inquiries and collaboration opportunities."
        />
        <meta
          name="keywords"
          content="contact peer research lab, research lab contact, academic research contact, research collaboration contact, peer research lab phone, research lab email"
        />
        <meta property="og:title" content="Contact Us - Peer Research Lab" />
        <meta
          property="og:description"
          content="Get in touch with Peer Research Lab. Contact us via phone, email, social media, or visit our office. We're here to help with your research inquiries and collaboration opportunities."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Peer Research Lab" />
        <meta
          name="twitter:description"
          content="Get in touch with Peer Research Lab. Contact us via phone, email, social media, or visit our office. We're here to help with your research inquiries and collaboration opportunities."
        />
      </Helmet>
      <div className="mt-6 md:mt-10 bg-gray-200 dark:bg-gray-900 p-2 md:p-5 lg:p-10 max-w-7xl mx-auto justify-center">
        {/* <SectionTitle heading="Contact Form" subHeading="Send Us a Message" /> */}
        <div className="py-5 md:py-14 lg:py-20 space-y-5 md:flex md:flex-row-reverse">
          <div className="flex-1 pl-10">
            <div className="max-w-md space-y-6 text-gray-800">
              {/* Chat Section */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Chat with us
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-justify">
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
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Contact us
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Call our team Mon-Fri from 8am to 5pm or send us an email.
                </p>
                <div className="mt-3 space-y-2">
                  <div
                    onClick={() => handleCopy(phone)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-blue-600 hover:underline">
                      <FaPhone />
                      <span>{phone}</span>
                    </div>
                  </div>
                  <div
                    onClick={() => handleCopy(email)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-blue-600 hover:underline">
                      <HiOutlineMail />

                      <span>{email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Section */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Visit us
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
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
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-5 border border-gray-200 dark:border-gray-700">
              <h1 className="font-semibold text-2xl mb-4 text-primary-800 dark:text-primary-200">
                Send a message
              </h1>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
