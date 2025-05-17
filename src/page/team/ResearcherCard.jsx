import { useNavigate } from "react-router-dom";

const ResearcherCard = ({ user = {} }) => {
  const navigate = useNavigate();

  const {
    _id,
    name = "Unknown",
    image = "https://res.cloudinary.com/dipwayvsu/image/upload/v1744132219/v0gfweuclqfywslynifb.jpg",
    email = "Email not specified",
    phone = "Phone not specified",
    university = "University not specified",
    socialMedia = {},
  } = user;

  const viewDetails = () => {
    navigate(`/userDetails/${_id}`, {
      state: { user },
    });
  };

  return (
    <div
      onClick={viewDetails}
      className="w-72 h-80 border rounded-lg overflow-hidden bg-base-100 shadow-sm hover:shadow-primary-500 hover:shadow-2xl transition duration-300 cursor-pointer"
    >
      <div className="h-[55%] w-full relative group">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
          }}
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

      <div className="p-4 space-y-2 text-dark-900">
        <h2 className="text-xl font-bold truncate" title={name}>
          {name}
        </h2>
        <div className="text-sm leading-5">
          <p>
            <span className="font-semibold">University:</span> {university}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearcherCard;
