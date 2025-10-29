import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const NewsCart = ({ singleNews }) => {
  if (!singleNews) {
    return <Loading />;
  }

  const { _id, authorEmail, createdAt, title, summary, image } = singleNews;

  const dateTime = new Date(createdAt);
  const date = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const [author, setAuthor] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let isMounted = true;
    if (authorEmail) {
      axiosPublic
        .get(`/post/${authorEmail}`)
        .then((res) => {
          if (isMounted) setAuthor(res.data);
        })
        .catch((err) => console.error("Error fetching author:", err));
    }
    return () => {
      isMounted = false;
    };
  }, [authorEmail, axiosPublic]);

  const preview = summary?.length > 180 ? `${summary.slice(0, 180)}…` : summary;

  return (
    <Link to={`/news/${_id}`} className="block cursor-pointer group">
      <article className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
          {/* Media - left on lg */}
          <div className="relative w-full lg:w-72 xl:w-80 shrink-0">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-3">
              {author ? (
                <img
                  className="h-9 w-9 rounded-full border-2 border-white/80 object-cover"
                  src={author.photoUrl}
                  alt={author.name}
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-white/70 animate-pulse" />
              )}
              <div className="text-white drop-shadow">
                <p className="text-xs font-semibold leading-tight">
                  {author?.name || "Loading author…"}
                </p>
                <p className="text-[11px] opacity-90 leading-tight">
                  {date} • {time}
                </p>
              </div>
            </div>
          </div>

          {/* Content - right on lg */}
          <div className="px-5 pb-5 pt-4 lg:p-4 flex-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-primary-600">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-justify line-clamp-3 lg:line-clamp-2">
              {preview || "Details not available"}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/40 px-2.5 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                News & Updates
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCart;
