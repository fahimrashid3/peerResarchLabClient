import React from "react";

const AdvisorCard = ({ advisor = {} }) => {
  const {
    name = "Name",
    image = "https://res.cloudinary.com/dipwayvsu/image/upload/v1744132219/v0gfweuclqfywslynifb.jpg",
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
          <div className="md:w-[35%]">
            <div className="max-w-sm w-full h-[500px] overflow-hidden flex justify-center items-center rounded-lg">
              <img
                src={image}
                alt={name}
                className="w-full h-auto object-cover  rounded-lg"
              />
            </div>
            <div>
              <h2 className="card-title mt-5">{name}</h2>
              <div>
                <div className="">
                  <div className="flex">
                    <p className="w-[20%]">University </p>
                    <p className="w-[80%]"> : {university}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[20%]">Email </p>
                    <p className="w-[80%]"> : {email}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[20%]">Phone </p>
                    <p className="w-[80%]"> : {phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[65%]">
            <div className="md:flex md:gap-5 items-center">
              <p className="text-justify md:w-[90%]">{details}</p>
              <div className="flex items-center justify-center md:block gap-5 md:w-[10%] h-full space-y-5">
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
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
