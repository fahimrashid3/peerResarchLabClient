import React from "react";

const AboutPageDesign = ({ data }) => {
  const { image, name, details } = data;
  return (
    <div className="min-h-screen grid md:grid-cols-2 justify-around items-center md:max-w-[90%] lg:max-w-[85%] mx-auto gap-5">
      <div>
        <img src={image} alt="" />
      </div>
      <div className="space-y-10">
        <p className="text-3xl font-bold text-primary-500">{name}</p>
        <p className="text-justify">{details}</p>
      </div>
    </div>
  );
};

export default AboutPageDesign;
