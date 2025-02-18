import React from "react";

const AdvisorCard = ({ advisor }) => {
  const { name, image, email, phone, details, university } = advisor;
  return (
    <div>
      <div className="hero bg-primary-100 border rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1">
            <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <div className="flex">
                <div>
                  <p>University </p>
                  <p>Email </p>
                  <p>Phone </p>
                </div>
                <div>
                  <p> : {university}</p>
                  <p> : {email}</p>
                  <p> : {phone}</p>
                </div>
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
