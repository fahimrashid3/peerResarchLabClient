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
    <div className="card bg-base-100 dark:bg-dark-800 border border-white dark:border-dark-700 rounded-xl shadow-sm hover:shadow-primary-500 dark:hover:shadow-primary-600 hover:shadow-2xl transition duration-300 p-5">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Advisor Image */}
        <div className="h-80 w-72 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
            }}
          />
        </div>

        {/* Info + Details + Socials */}
        <div className="w-full flex flex-col justify-between gap-4">
          {/* Name and Contact Info */}
          <div className="md:flex md:flex-row-reverse items-center">
            <div className="flex md:flex-col items-center gap-5 md:w-[15%] justify-center">
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
            <div className="space-y-5 md:w-[85%]">
              <div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  {name}
                </h2>
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <div className="flex">
                    <p className="font-semibold w-24 text-dark-900 dark:text-white">
                      University
                    </p>
                    <p className="text-dark-900 dark:text-gray-300">
                      : {university}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-semibold w-24 text-dark-900 dark:text-white">
                      Email
                    </p>
                    <p className="text-dark-900 dark:text-gray-300">
                      : {email}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-semibold w-24 text-dark-900 dark:text-white">
                      Phone
                    </p>
                    <p className="text-dark-900 dark:text-gray-300">
                      : {phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Text */}
              <div>
                <p className="text-justify text-gray-800 dark:text-gray-300">
                  {details}
                </p>
              </div>
            </div>

            {/* Social Media Vertical */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
