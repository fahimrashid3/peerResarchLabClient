const UserCard = ({ member = {} }) => {
  const {
    name = "Name",
    image = "https://res.cloudinary.com/dipwayvsu/image/upload/v1744132219/v0gfweuclqfywslynifb.jpg",
    university = "University not specified",
    role = "Advisor",
  } = member;
  return (
    <div className="bg-base-100 shadow-sm h-36 w-96 border flex items-center gap-3 p-2">
      <figure className="w-28 h-full overflow-hidden flex-shrink-0">
        <img
          className="h-full w-full object-cover rounded-md"
          src={image}
          alt="Advisor"
        />
      </figure>
      <div className="flex flex-col justify-center w-full pr-2 overflow-hidden">
        <h2 className="text-lg font-semibold leading-snug">{name}</h2>
        <p className="text-sm text-gray-700 leading-tight line-clamp-2">
          {university}
        </p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default UserCard;
