import { useLocation } from "react-router-dom";

const UserDetail = () => {
  const { state } = useLocation();
  const user = state?.user;

  if (!user)
    return <p className="text-center text-xl mt-10">User data not found.</p>;

  const {
    name = "Name",
    image = "https://res.cloudinary.com/dipwayvsu/image/upload/v1744132219/v0gfweuclqfywslynifb.jpg",
    email = "Email not specified",
    phone = "Phone not specified",
    details = "This researcher is a dedicated member of the academic community with a focus on collaboration, innovation, and advancing knowledge. They actively engage in various research projects and strive to contribute meaningful insights within their field. Committed to fostering learning and discovery, this individual embraces interdisciplinary approaches and aims to make a positive impact through their work.",
    university = "University not specified",
    socialMedia = {},
  } = user;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto card bg-base-100 border rounded-xl shadow-sm p-5">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image + Basic Info */}
          <div className="lg:w-[35%] flex flex-col items-center">
            <div className="w-64 h-72 overflow-hidden rounded-lg">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
                }}
              />
            </div>
            <div className="mt-5 w-full text-left">
              <h2 className="text-2xl font-bold">{name}</h2>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex justify-start">
                  <p className="font-semibold">University</p>
                  <p className="ml-2"> : {university}</p>
                </div>
                <div className="flex justify-start">
                  <p className="font-semibold">Email</p>
                  <p className="ml-2"> : {email}</p>
                </div>
                <div className="flex justify-start">
                  <p className="font-semibold">Phone</p>
                  <p className="ml-2"> : {phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details + Social Media */}
          <div className="lg:w-[65%] flex items-center justify-between">
            {/* Details Text */}
            <div className="w-[85%]">
              <p className="text-justify text-gray-800">{details}</p>
            </div>

            {/* Social Media Vertical */}
            <div className="flex flex-col items-center gap-5 w-[10%]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
