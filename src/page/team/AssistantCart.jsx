import React from "react";

const AssistantCart = ({ researchAssistant }) => {
  const {
    name = "Unknown",
    image = "https://res.cloudinary.com/dipwayvsu/image/upload/v1744132219/v0gfweuclqfywslynifb.jpg",
    email = "Email not specified",
    phone = "Phone not specified",
    details = "Details is not specified",
    university = "University not specified",
    socialMedia = {},
  } = researchAssistant;

  return (
    <div className="card card-side bg-base-100 border rounded-lg shadow-sm hover:shadow-primary-500 hover:shadow-2xl transition duration-300 p-3 gap-5">
      <figure className="h-28 w-32 max-w-[35%] overflow-hidden rounded-lg">
        <img
          className="h-full w-full object-cover p-2"
          src={image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
          }}
        />
      </figure>

      <div className="flex flex-col justify-between w-[55%] h-28">
        <h2 className="text-lg font-bold truncate" title={name}>{name}</h2>
        <p className="text-sm text-gray-700 truncate" title={university}>{university}</p>
        <p className="text-sm text-gray-700 truncate" title={phone}>{phone}</p>
        <p className="text-sm text-gray-700 truncate" title={email}>{email}</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-3 w-[10%] h-full">
        {socialMedia?.linkedin && (
          <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
          </a>
        )}
        {socialMedia?.twitter && (
          <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
          </a>
        )}
        {socialMedia?.facebook && (
          <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
          </a>
        )}
        {socialMedia?.github && (
          <a href={socialMedia.github} target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
          </a>
        )}
      </div>
    </div>
  );
};

export default AssistantCart;
