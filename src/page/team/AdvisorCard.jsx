import React from "react";

const AdvisorCard = ({ advisor = {} }) => {
  const {
    name = "Unknown",
    image = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    email = "Email not specified",
    phone = "Phone not specified",
    details = "Details is not specified",
    university = "University not specified",
    socialMedia = {},
  } = advisor;
  return (
    <div>
      <div className="hero bg-primary-100 border rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-[35%]">
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
          <div className="w-[65%]">
            <div className="flex gap-5 items-center">
              <p className="text-justify w-[90%]">{details}</p>
              <div className="w-[10%] h-full space-y-5">
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
