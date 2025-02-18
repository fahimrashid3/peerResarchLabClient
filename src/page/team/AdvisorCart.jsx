import React from "react";

const AdvisorCart = ({ advisor }) => {
  const { name, image, role, email, phone, details, university } = advisor;
  return (
    <div>
      <div className="hero border">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1">
            <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
            <p>Name :{name}</p>
            <p>University :{university}</p>
            <p>Role :{role}</p>
            <p>Email:{email}</p>
            <p>Phone:{phone}</p>
          </div>
          <div className="flex-1">
            <p className="text-justify">{details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCart;
