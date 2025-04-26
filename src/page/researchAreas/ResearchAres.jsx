import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ResearchAres = () => {
  const axiosPublic = useAxiosPublic();
  const [researchArea, setResearchArea] = useState([]);

  useEffect(() => {
    axiosPublic.get("/researchArea").then((res) => {
      setResearchArea(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="pt-24 mx-auto">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 rounded-lg max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
        {researchArea.map((researchArea) => (
          <div key={researchArea._id} className="hero bg-base-200">
            <div className="hero-content flex-col md:flex-row">
              <img
                src={researchArea.image}
                alt={researchArea.departmentName}
                className="md:max-w-[40%] rounded-lg shadow-2xl "
              />

              <div className="space-y-3 md:max-w-[60%]">
                <h1
                  className="text-2xl md:text-3xl font-bold line-clamp-1 cursor-default"
                  title={researchArea.departmentName}
                >
                  {researchArea.departmentName}
                </h1>

                <p className="font-semibold">
                  Total Member : {researchArea.totalMembers}
                </p>

                <p
                  className="text-justify line-clamp-3 cursor-default"
                  title={researchArea.details}
                >
                  {researchArea.details}
                </p>

                <Link
                  to={`/researchAreaDetails/${researchArea._id}`}
                  state={{ researchArea }}
                  className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchAres;
