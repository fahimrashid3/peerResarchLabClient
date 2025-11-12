import { useNavigate } from "react-router-dom";

const UserCard = ({ member = {} }) => {
  const navigate = useNavigate();

  const {
    _id,
    name = "Name",
    image = "https://res.cloudinary.com/dipwayvsu/image/upload/v1744132219/v0gfweuclqfywslynifb.jpg",
    university = "University not specified",
    role = "Advisor",
  } = member;

  const viewDetails = () => {
    navigate(`/userDetails/${_id}`, {
      state: { user: member },
    });
  };

  return (
    <div
      onClick={viewDetails}
      className="bg-white dark:bg-gray-950 shadow-sm hover:shadow-md dark:hover:shadow-lg rounded-lg flex items-center gap-3 sm:gap-4 p-3 sm:p-4 cursor-pointer hover:shadow-primary-500/50 dark:hover:shadow-primary-600/50 transition-all duration-300 w-full max-w-sm mx-auto"
    >
      <figure className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 flex-shrink-0 overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
          }}
        />
      </figure>
      <div className="flex flex-col justify-center w-full min-w-0 overflow-hidden">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold leading-tight text-gray-800 dark:text-gray-100 mb-1">
          {name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 leading-tight line-clamp-2 dark:text-gray-300 mb-1">
          {university}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
          {role}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
