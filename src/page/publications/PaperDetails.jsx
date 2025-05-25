import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SiRoamresearch } from "react-icons/si";

const PaperDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [paper, setPaper] = useState(null);
  const [morePapers, setMorePapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (_id) {
      setLoading(true);
      axiosPublic
        .get(`/researchPaper/${_id}`)
        .then((res) => setPaper(res.data))
        .catch((error) => console.error("Error fetching paper:", error))
        .finally(() => setLoading(false));
    }
  }, [_id, axiosPublic]);

  useEffect(() => {
    if (paper?.authorEmail) {
      axiosPublic
        .get(`/post/${paper.authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));

      axiosPublic
        .get(`/morePaper/${paper._id}`)
        .then((res) => setMorePapers(res.data))
        .catch((err) => console.error("Error fetching more papers:", err));
    }
  }, [paper?.authorEmail, paper?._id, axiosPublic]);

  if (loading) return <Loading />;
  if (!paper) return <p>Paper not found</p>;

  const { createdAt, title, details, image } = paper;

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

  return (
    <div className="lg:pt-24 lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <div className="border p-4 space-y-5">
            <img
              className="lg:h-96 mx-auto w-full object-cover rounded-md"
              src={image}
              alt={title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
              }}
            />

            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex gap-5 font-bold">
              <p>{date}</p> <p>{time}</p>
            </div>
            {/* Additional Metadata */}
            <div className="space-y-1">
              <p>
                <strong>Publisher:</strong> {paper.publisher || "N/A"}
              </p>
              <p>
                <strong>DOI:</strong> {paper.doi || "N/A"}
              </p>
              <p>
                <strong>Date of Publication:</strong>{" "}
                {paper.publicationDate
                  ? new Date(paper.publicationDate).toDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Author(s):</strong>{" "}
                {paper.authors?.length > 0
                  ? paper.authors.join(", ")
                  : paper.authorName || "Unknown"}
              </p>
              <a
                className="flex items-center gap-2 text-primary-500 font-semibold underline cursor-pointer hover:underline"
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiRoamresearch />
                <span>View full Paper</span>
              </a>
            </div>
            <p className="text-lg text-justify whitespace-pre-line">
              {details}
            </p>

            <Link
              to={"/publications"}
              onClick={scrollToTop}
              className="btn bg-transparent border-1 border-b-4 mx-auto border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
            >
              <IoMdArrowRoundBack />
              Back to Publication
            </Link>
          </div>
        </div>

        <div className="col-span-1 mt-5 space-y-5">
          <h1 className="font-semibold text-xl mb-2">
            More Research from {author?.name || "Author"}
          </h1>
          {morePapers.length > 0 ? (
            <div className="space-y-3">
              {morePapers.map((morePaper) => (
                <Link
                  to={`/paper/${morePaper._id}`}
                  className="block"
                  key={morePaper._id}
                  onClick={scrollToTop}
                >
                  <div className="flex items-center p-3 bg-dark-200 text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl rounded-lg border border-dark-500">
                    <figure className="flex-shrink-0 border-2 rounded-lg">
                      <img
                        className="h-32 w-24 rounded-lg object-cover"
                        src={morePaper.image}
                        alt={morePaper.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://res.cloudinary.com/dipwayvsu/image/upload/v1745146763/uauic3zxcvxvdepwl3dk.webp";
                        }}
                      />
                    </figure>
                    <div className="ml-4 flex flex-col justify-center">
                      <h2
                        className="lg:text-xl text-lg font-bold line-clamp-2"
                        title={morePaper.title}
                      >
                        {morePaper.title}
                      </h2>
                      <p className="mt-2 text-sm line-clamp-3 text-justify">
                        {morePaper.details}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No More Paper published by {author?.name || "Author"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;
