import React from "react";

const AssistantCart = ({ researchAssistant }) => {
  const {
    name = "Unknown",
    image = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    email = "Email not specified",
    phone = "Phone not specified",
    details = "Details is not specified",
    university = "University not specified",
    socialMedia = {},
  } = researchAssistant;

  return (
    <div>
      <div className="card card-side bg-primary-100 shadow-xl p-3 gap-5">
        <figure className="h-28 w-32 max-w-[35%]">
          <img className="p-3" src={image} alt={name} />
        </figure>
        <div className="h-28 w-[55%]">
          <h2 className="card-title">{name}</h2>
          <p>{university}</p>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
        <div className="block h-full space-y-3 w-[10%]">
          <div>
            {socialMedia?.linkedin && (
              <a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8 flex items-center justify-center"
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                />
              </a>
            )}
          </div>
          <div>
            {socialMedia?.twitter && (
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8 flex items-center justify-center"
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                />
              </a>
            )}
          </div>
          <div>
            {socialMedia?.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8 flex items-center justify-center"
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                />
              </a>
            )}
          </div>
          <div>
            {socialMedia?.github && (
              <a
                href={socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-8 h-8 flex items-center justify-center"
                  src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                  alt="GitHub"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantCart;
