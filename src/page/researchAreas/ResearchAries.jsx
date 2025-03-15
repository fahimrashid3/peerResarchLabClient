import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ResearchAries = () => {
  const axiosPublic = useAxiosPublic();
  const [researchAreaDetails, setResearchAreaDetails] = useState([]);

  useEffect(() => {
    axiosPublic.get("/researchArea").then((res) => {
      setResearchAreaDetails(res.data);
    });
  }, [axiosPublic]);
  console.log(researchAreaDetails);
  return (
    <div className="pt-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 grid-cols-1">
        {researchAreaDetails.map((researchArea) => (
          <div
            className="
          bg-primary-300 cursor-pointer hover:bg-primary-500 transition-all duration-1000 p-8 hover:p-10  md:m-6 m-4 text-dark-400 hover:text-white rounded-lg  border-r-8  border-yellow-400"
          >
            <p className="font-bold text-xl">{researchArea.departmentName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchAries;
