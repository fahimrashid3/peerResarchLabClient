import React from "react";

const AdvisorCard = ({ advisor }) => {
  const { name, image, role, email, phone, details, university } = advisor;
  return (
    <div>
      <div className="hero border">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1">
            <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
            <div className="flex">
              <div>
                <p>Name </p>
                <p>University </p>
                <p>Role </p>
                <p>Email </p>
                <p>Phone </p>
              </div>
              <div>
                <p> : {name}</p>
                <p> : {university}</p>
                <p> : {role}</p>
                <p> : {email}</p>
                <p> : {phone}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-justify">{details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
