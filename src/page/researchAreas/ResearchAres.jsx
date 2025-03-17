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
    <div className="pt-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 grid-cols-1">
        {researchArea.map((researchArea) => (
          <Link
            to={`/researchAreaDetails/${researchArea._id}`}
            className="
          bg-primary-300 cursor-pointer hover:bg-primary-500 transition-all duration-300 p-8  md:m-6 m-4 text-dark-200 hover:text-white rounded-lg  border-r-4 hover:border-r-8 border-yellow-400"
          >
            <p className="font-bold text-xl">{researchArea.departmentName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResearchAres;
