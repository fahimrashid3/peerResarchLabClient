import React from "react";

const AboutPageDesignRevers = ({ data }) => {
  const { image, name, details } = data;

  return (
    <div className="flex flex-col md:flex-row-reverse justify-around items-center md:max-w-[90%] lg:max-w-[85%] mx-auto gap-5">
      <div className="w-full md:w-1/2">
        <img src={image} alt={name} className="w-full h-auto object-cover" />
      </div>
      <div className="w-full md:w-1/2 space-y-10 p-4">
        <p className="text-3xl font-bold text-primary-500">{name}</p>
        <p className="text-justify">{details}</p>
      </div>
    </div>
  );
};

export default AboutPageDesignRevers;
