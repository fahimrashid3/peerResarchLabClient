import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const NewsDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (_id) {
      axiosPublic
        .get(`/news/${_id}`)
        .then((res) => {
          console.log(res.data);
          setNews(res.data);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          alert("Failed to load news. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [_id, axiosPublic]);

  useEffect(() => {
    if (news?.authorEmail) {
      axiosPublic
        .get(`/post/${news.authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));
    }
  }, [news?.authorEmail, axiosPublic]);

  if (loading) return <Loading />;
  if (!news) return <p className="text-center text-red-600">News not found.</p>;

  const { authorEmail, createdAt, title, details, image } = news;

  return (
    <div className="lg:pt-24 lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen">
      <div className="grid grid-cols-4 gap-5">
        {/* News Content */}
        <div className="col-span-4 lg:col-span-3">
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
              Back to Publication
            </Link>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="col-span-4 lg:col-span-1">
          <h1 className="font-semibold text-xl mb-2">Additional Content</h1>
          <p>Any additional content can be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
