import React from "react";

const ResearcherCard = ({ user = {} }) => {
  const {
    name = "Unknown",
    image = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    email = "Email not specified",
    phone = "Phone not specified",
    university = "University not specified",
  } = user;

  return (
    <div>
      <div className="card card-compact bg-primary-100 w-96 shadow-xl">
        <figure>
          <img className="p-3 " src={image} alt={name} />
        </figure>
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
    </div>
  );
};

export default ResearcherCard;
