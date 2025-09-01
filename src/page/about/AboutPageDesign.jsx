import React from "react";

const AboutPageDesign = ({ data }) => {
  const { image, name, details } = data;

  return (
    <div className="flex flex-col md:flex-row justify-around items-center md:max-w-[90%] lg:max-w-[85%] mx-auto gap-5 bg-dark-200 dark:bg-dark-900 p-5 rounded-lg md:rounded-xl">
      <div className="w-full md:w-1/2">
        <img src={image} alt={name} className="w-full h-auto object-cover" />
      </div>
      <div className="w-full md:w-1/2 space-y-10 p-4">
        <p className="text-3xl font-bold text-primary-500">{name}</p>
        <p className="text-justify text-dark-900 dark:text-white">{details}</p>
      </div>
    </div>
  );
};

export default AboutPageDesign;
