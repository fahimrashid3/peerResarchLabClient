import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
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
    <Link to={`/paper/${_id}`} className="block">
      <div className="mb-10 border space-y-5 p-5 rounded-lg w-96 h-[500px] card bg-base-100 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden">
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
        <div className="mt-2 space-y-2">
          <h2
            className="card-title text-lg line-clamp-2 text-dark-900"
            title={title}
          >
            {title}
          </h2>
          <p className="text-sm text-gray-700">
            {details.length > 200 ? `${details.slice(0, 200)}...` : details}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PublicationsCard;
