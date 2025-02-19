import React from "react";

const ResearcherCard = ({ user = {} }) => {
  const {
    name = "Unknown",
    image = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    email = "Email not specified",
    phone = "Phone not specified",
    university = "University not specified",
    socialMedia = {},
  } = user;

  return (
    <div>
      <div className="card card-compact bg-primary-100 shadow-xl h-96">
        <figure className="h-[60%] relative group">
          <img
            className="p-3 w-full h-full object-cover"
            src={image}
            alt={name}
          />

          {/* Social Media Icons (visible on hover) */}
          <div className="absolute inset-0 flex items-center justify-center space-x-4 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {socialMedia?.linkedin && (
              <a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8"
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                />
              </a>
            )}
            {socialMedia?.twitter && (
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8"
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                />
              </a>
            )}
            {socialMedia?.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8"
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                />
              </a>
            )}
            {socialMedia?.github && (
              <a
                href={socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8"
                  src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                  alt="GitHub"
                />
              </a>
            )}
          </div>
        </figure>

        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div className="flex">
            <p className="w-[25%]">University </p>
            <p className="w-[75%]"> : {university}</p>
          </div>
          <div className="flex">
            <p className="w-[25%]">Email </p>
            <p className="w-[75%]"> : {email}</p>
          </div>
          <div className="flex">
            <p className="w-[25%]">Phone </p>
            <p className="w-[75%]"> : {phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherCard;
