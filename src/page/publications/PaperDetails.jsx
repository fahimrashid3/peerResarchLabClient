import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const PaperDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (_id) {
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
        .get(`/paperAuthor/${paper.authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));
    }
  }, [paper?.authorEmail, axiosPublic]);

  if (loading) return <Loading />;
  if (!paper) return <p>Paper not found</p>;

  const { authorEmail, createdAt, title, details, rating, image } = paper;

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
          <h1 className="font-semibold text-xl mb-2">Paper Details</h1>

          <div className="border p-4 space-y-5">
            <img
              className="lg:h-96 mx-auto w-full object-cover rounded-md"
              src={image}
              alt={title}
            />

            <div className="flex items-start">
              {author ? (
                <>
                  <img
                    className="rounded-full w-12 h-12 mr-3 object-cover object-center"
                    src={author.photoUrl}
                    alt={author.name}
                  />
                  <div>
                    <p className="font-semibold text-xl">{author.name}</p>

                    <div className="flex gap-5 font-semibold text-gray-600">
                      <p>{authorEmail}</p>
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

            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-lg text-justify">{details}</p>

            <Link
              to={"/publications"}
              className="btn bg-transparent border-1 border-b-4 mx-auto border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
            >
              <IoMdArrowRoundBack />
              Back to Papers
            </Link>
          </div>
        </div>

        <div className="col-span-1">
          <h1 className="font-semibold text-xl mb-2">Additional Content</h1>
          <p>Any additional content can be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;
