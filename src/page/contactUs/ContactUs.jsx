import React from "react";
import SectionTitle from "../../components/SectionTitle";
import ContactForm from "./ContactForm";
import {
  FaCommentDots,
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import useInfo from "../../hooks/useInfo";
import Loading from "../../components/Loading";
import { IoLogoWhatsapp } from "react-icons/io5";

const ContactUs = () => {
  const [info, infoLoading] = useInfo();

  // ✅ Ensure info and labInformation exist before destructuring
  if (infoLoading || !info || !info.labInformation) {
    return <Loading />;
  }

  const { contactDetails, phoneNumber, socialMedia, location } =
    info.labInformation;
  const { facebook, linkedIn, X, whatsApp } = socialMedia;
  console.log(whatsApp);

  return (
    <div className="pt-10">
      <div className="mt-6 md:mt-10">
        <SectionTitle heading="Contact Form" subHeading="Send Us a Message" />
        <div
          className="
            bg-primary-100 dark:bg-dark-700 rounded-lg text-dark-900 dark:text-white py-5 md:py-14 lg:py-20 space-y-5
            md:flex
          "
        >
          <div className="flex-1">
            <ContactForm />
          </div>
          <div className="flex-1">
            <div className="max-w-md space-y-6 text-gray-800">
              {/* Chat Section */}
              <div>
                <h3 className="font-semibold text-lg">Chat with us</h3>
                <p className="text-sm text-gray-600 text-justify">
                  {contactDetails}
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                    href={`https://wa.me/${whatsApp}`}
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
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
                    <FaPhone />
                    <span>{phoneNumber}</span>
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
                  <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
                    <FaMapMarkerAlt />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
