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

  useEffect(() => {
    if (_id) {
      axiosPublic
        .get(`/researchPaper/${_id}`)
        .then((res) => {
          setPaper(res.data);
        })
        .catch((error) => console.error("Error fetching paper:", error))
        .finally(() => setLoading(false));
    } else {
      console.warn("No paper ID found in params");
    }
  }, [_id, axiosPublic]);
  if (loading) {
    return <Loading />;
  }

  if (!paper) {
    return <p>paper not found</p>;
  }

  return (
    <div className="lg:pt-24 lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <h1 className="font-semibold text-xl mb-2">paper details</h1>

          <div className="border p-4  space-y-5">
            <img className="lg:h-96 mx-auto" src={paper.image} alt="" />
            <h2 className="text-2xl font-bold">{paper.title}</h2>
            <p className="text-lg text-justify">{paper.details}</p>
            {/* Render other details from the paper object */}
            <Link
              to={"/publications"}
              className="
          btn bg-transparent border-1 border-b-4 mx-auto
           border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white
            hover:border-primary-600"
            >
              <IoMdArrowRoundBack />
              Back to Blocks
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="font-semibold text-xl mb-2">Additional content</h1>
          <h1>Any additional content can be displayed</h1>
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;
