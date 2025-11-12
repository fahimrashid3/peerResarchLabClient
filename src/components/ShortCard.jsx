import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";

const ShortCard = ({ researchPaper }) => {
  if (!researchPaper) {
    return <h1>loading</h1>;
  }
  // Fetch author details using authorEmail
  const { title, image, details } = researchPaper;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Link
      to={`/paper/${researchPaper._id}`}
      onClick={scrollToTop}
      className="block w-full"
    >
      <div className="flex items-center w-full md:p-4 p-3 my-3 md:my-0 bg-white text-dark-900 dark:bg-gray-950 dark:text-gray-100 shadow-xl rounded-lg lg:h-48 md:h-36 h-auto min-h-[120px]">
        {/* Fixed height */}
        <figure className="flex-shrink-0 border-2 rounded-lg">
          <img
            className="h-20 w-16 sm:h-24 sm:w-20 md:h-28 md:w-24 lg:h-32 lg:w-28 rounded-lg object-cover"
            src={image}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dipwayvsu/image/upload/v1745146763/uauic3zxcvxvdepwl3dk.webp";
            }}
          />
        </figure>
        <div className="ml-3 md:ml-4 flex flex-col justify-center flex-1 min-w-0">
          <h2
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold line-clamp-2 md:line-clamp-1 text-left"
            title={title}
          >
            {title}
          </h2>
          <p className="mt-1 md:mt-2 text-xs sm:text-sm md:text-sm line-clamp-2 md:line-clamp-3 text-left">
            {details}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ShortCard;
