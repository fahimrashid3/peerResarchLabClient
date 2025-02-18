import React from "react";

const AssistantCart = ({ researchAssistant }) => {
  const { name, image, email, phone, university } = researchAssistant;

  return (
    <div>
      <div className="card card-side bg-primary-100 shadow-xl p-3 gap-5">
        <figure className="h-28 w-32">
          <img className="p-3" src={image} alt={name} />
        </figure>
        <div className="h-28">
          <h2 className="card-title">{name}</h2>
          <p>{university}</p>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default AssistantCart;
