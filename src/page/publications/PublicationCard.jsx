// import { useEffect, useState } from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const PublicationsCard = ({ paper }) => {
  if (!paper) {
    return <Loading />;
  }

  const { _id, authorEmail, createdAt, title, details, image } = paper;
  const dateTime = new Date(createdAt);

  const date = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // const [author, setAuthor] = useState(null);
  // const axiosPublic = useAxiosPublic();

  // useEffect(() => {
  //   if (authorEmail) {
  //     axiosPublic
  //       .get(`/post/${authorEmail}`)
  //       .then((res) => setAuthor(res.data))
  //       .catch((err) => console.error("Error fetching author:", err));
  //   }
  // }, [authorEmail, axiosPublic]);

  return (
    <Link to={`/paper/${_id}`} className="block">
      <div
        className="mb-10 border border-white dark:border-gray-700 space-y-5 p-5 rounded-lg w-96 h-[500px] card 
      bg-white dark:bg-gray-950 shadow-sm hover:shadow-primary-500 dark:hover:shadow-primary-600 hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden"
      >
        <figure className="h-72 w-[345px]">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
            }}
          />
        </figure>

        <div className="flex bg-gray-50 dark:bg-dark-800 text-dark-900 dark:text-white justify-between rounded-t-lg"></div>
        <div className="mt-2 space-y-2">
          <h2
            className="card-title text-lg line-clamp-2 text-dark-900 dark:text-white"
            title={title}
          >
            {title}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {details?.length > 200
              ? `${details.slice(0, 200)}...`
              : details || "No description available"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PublicationsCard;
