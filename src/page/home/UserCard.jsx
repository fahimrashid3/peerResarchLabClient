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
      className="bg-base-100 dark:bg-dark-800 shadow-sm h-36 w-96 border border-white dark:border-dark-700 flex items-center gap-3 p-2 cursor-pointer hover:shadow-primary-500 dark:hover:shadow-primary-600 transition duration-300"
    >
      <figure className="w-28 h-full overflow-hidden flex-shrink-0">
        <img
          className="h-full w-full object-cover rounded-md"
          src={image}
          alt="Advisor"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
          }}
        />
      </figure>
      <div className="flex flex-col justify-center w-full pr-2 overflow-hidden">
        <h2 className="text-lg font-semibold leading-snug text-dark-900 dark:text-white">
          {name}
        </h2>
        <p className="text-sm text-gray-700 leading-tight line-clamp-2 dark:text-gray-300">
          {university}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default UserCard;
