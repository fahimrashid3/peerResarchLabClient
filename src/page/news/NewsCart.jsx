import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const NewsCart = ({ singleNews }) => {
  // If singleNews is undefined or null, return null (or a skeleton loader)
  if (!singleNews) {
    return <Loading />;
  }

  const { _id, authorEmail, createdAt, title, summary, image } = singleNews;
  const dateTime = new Date(createdAt);

  // Format the date (e.g., "February 15, 2025")
  const date = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time (e.g., "11:23:58 AM")
  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  });

  // Fetch author details using authorEmail
  const [author, setAuthor] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (authorEmail) {
      axiosPublic
        .get(`/post/${authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));
    }
  }, [authorEmail, axiosPublic]);

  return (
    <div className="mb-24 border p-5 rounded-lg">
      {/* Author Section */}
      <div className="flex bg-gray-50 text-dark-900 justify-between rounded-t-lg">
        <div className="flex">
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
        </div>
      </div>

      {/* News details Section */}
      <div className="space-y-5 mt-5 mb-5">
        <p className="font-bold text-2xl">{title}</p>
        <img className="h-80 w-full object-cover" src={image} alt={title} />
        <div className="relative">
          <p className="text-justify mb-8">
            {summary || "Details not available"}
          </p>
          <Link
            to={`/news/${_id}`}
            className="bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCart;
