import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ResearchAres = () => {
  const axiosPublic = useAxiosPublic();
  const [researchArea, setResearchArea] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/researchArea").then((res) => {
      setResearchArea(res.data);
      setLoading(false);
    });
  }, [axiosPublic]);

  const renderSkeleton = () => (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 rounded-lg max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="hero bg-dark-200 rounded-lg animate-pulse">
          <div className="hero-content flex-col md:flex-row gap-4">
            <div className="md:max-w-[35%]  h-52 bg-primary-300 rounded-lg" />
            <div className="space-y-3 md:max-w-[65%] w-full">
              <div className="h-7 w-full bg-dark-300 rounded" />
              <div className="h-28 bg-dark-300 rounded w-full" />
              <div className="w-20 h-10 bg-primary-200 rounded border-b-8 border-primary-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-24 mx-auto">
      {loading ? (
        renderSkeleton()
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 rounded-lg max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
          {researchArea.map((area) => (
            <div key={area._id} className="hero bg-base-200 rounded-lg">
              <div className="hero-content flex-col md:flex-row ">
                <img
                  src={area.image}
                  alt={area.departmentName}
                  className="md:max-w-[40%] rounded-lg shadow-2xl"
                />
                <div className="space-y-3 md:max-w-[60%]">
                  <h1
                    className="text-2xl md:text-3xl font-bold line-clamp-1 cursor-default"
                    title={area.departmentName}
                  >
                    {area.departmentName}
                  </h1>
                  <p
                    className="text-justify line-clamp-3 cursor-default"
                    title={area.details}
                  >
                    {area.details}
                  </p>
                  <Link
                    to={`/researchAreaDetails/${area._id}`}
                    state={{ researchArea: area }}
                    className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchAres;
