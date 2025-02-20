import React from "react";
import SectionTitle from "../../components/SectionTitle";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div className="pt-10">
      <div className="mt-6 md:mt-10">
        {/* <Information></Information> */}
        <SectionTitle
          heading="Contact Form"
          subHeading={"Sent Us a Message"}
        ></SectionTitle>
        <ContactForm></ContactForm>
      </div>
    </div>
  );
};

export default ContactUs;
