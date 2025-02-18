import React from "react";

const ResearcherCard = ({ user }) => {
  const { name, image, role, email, phone, university } = user;
  return (
    <div>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
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
      </div>
    </div>
  );
};

export default ResearcherCard;
