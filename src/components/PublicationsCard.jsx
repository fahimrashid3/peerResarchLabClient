import { CiBookmark, CiShare2 } from "react-icons/ci";
import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PublicationsCard = ({ paper }) => {
  // If paper is undefined, return null (or a skeleton loader)
  console.log(paper);
  if (!paper) {
    return <p>fahim</p>;
  }

  const { _id, authorEmail, createdAt, title, details, rating, image } = paper;
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

  // Fetch author details
  const [author, setAuthor] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (authorEmail) {
      axiosPublic
        .get(`/paperAuthor/${authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));
    }
  }, [authorEmail, axiosPublic]);

  return (
    <div className="mb-24 border p-5 rounded-lg">
      {/* Author Section */}
      <div className="flex bg-gray-50 text-black justify-between rounded-t-lg">
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
        <button className="flex text-xl items-center gap-2 mr-3">
          <CiBookmark />
          <CiShare2 />
        </button>
      </div>

      {/* Paper Content Section */}
      <div className="space-y-5 mt-5 mb-5">
        <p className="font-bold text-2xl">{title}</p>
        <img className="h-80 mx-auto" src={image} alt={"Image not available"} />
        <p>
          {details.length > 200 ? (
            <>
              {details.slice(0, 200)}
              <Link to={`/paper/${_id}`} className="text-blue-600">
                Read more...
              </Link>
            </>
          ) : (
            details
          )}
        </p>
      </div>
    </div>
  );
};

export default PublicationsCard;
