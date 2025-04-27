import { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ShortCard = ({ researchPaper }) => {
  if (!researchPaper) {
    return <h1>loading</h1>;
  }
  // Fetch author details using authorEmail
  const [author, setAuthor] = useState(null);
  const axiosPublic = useAxiosPublic(); // Ensure useAxiosPublic is correctly defined and imported
  const { title, authorEmail, image, details, createdAt } = researchPaper;
  const dateTime = new Date(createdAt);

  // Format the date (e.g., "February 15, 2025")
  const date = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Format the time (e.g., "11:23:58 AM")
  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  });
  // useEffect(() => {
  //   if (authorEmail) {
  //     axiosPublic
  //       .get(`/post/${authorEmail}`)
  //       .then((res) => setAuthor(res.data))
  //       .catch((err) => console.error("Error fetching author:", err));
  //   }
  // }, [authorEmail, axiosPublic]);
  return (
    <Link
      to={`/paper/${researchPaper._id}`}
      onClick={scrollToTop}
      className="block"
    >
      <div className="flex items-center md:p-5 p-3 my-3 md:my-0 bg-dark-200 text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl rounded-lg h-48 border border-dark-500">
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
          {/* <div className="flex">
            {author ? (
              <>
                <img
                  className="rounded-full w-12 h-12 mr-3 object-cover object-center"
                  src={author.photoUrl}
                  alt={author.name}
                />
                <div>
                  <p className="font-semibold text-xl">{author.name}</p>
                  <div className="flex gap-5">
                    <p>{date}</p>
                    <p>{time}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex w-52 flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-20"></div>
                    <div className="skeleton h-3 w-28"></div>
                  </div>
                </div>
              </div>
            )}
          </div> */}
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
