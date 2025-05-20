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
      className="block"
    >
      <div
        className="
      flex items-center md:p-5 p-3 my-3 md:my-0 bg-white text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl rounded-lg h-48 "
      >
        {/* Fixed height */}
        <figure className="flex-shrink-0 border-2 rounded-lg">
          <img
            className="h-36 w-32 rounded-lg object-cover"
            src={image}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dipwayvsu/image/upload/v1745146763/uauic3zxcvxvdepwl3dk.webp";
            }}
          />
        </figure>
        <div className="ml-4 flex flex-col justify-center">
          <h2
            className="lg:text-xl text-lg font-bold line-clamp-1 text-justify"
            title={title}
          >
            {title}
          </h2>
          <p className="mt-2 text-sm line-clamp-3 text-justify">{details}</p>
        </div>
      </div>
    </Link>
  );
};

export default ShortCard;
