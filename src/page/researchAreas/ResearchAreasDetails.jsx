import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const ResearchAreasDetails = () => {
  const { _id } = useParams(); // Extract `_id` from URL
  const axiosPublic = useAxiosPublic();
  const [researchAreaDetails, setResearchAreaDetails] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch research area details
    axiosPublic
      .get(`/researchArea/${_id}`)
      .then((res) => {
        setResearchAreaDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [axiosPublic, _id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!researchAreaDetails) return <p>No data found</p>;

  return (
    <div className="pt-24 max-w-7xl mx-auto min-h-screen space-y-5">
      <p className="font-bold text-xl">{researchAreaDetails.departmentName}</p>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {researchAreaDetails.subDepartments.map((subDept, index) => (
          <div
            key={index}
            className="bg-primary-300 hover:bg-primary-500 transition-all duration-300 p-8 text-dark-200 hover:text-white rounded-lg border-r-4 hover:border-r-8 border-yellow-400"
          >
            <p className="font-bold text-xl">{subDept}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchAreasDetails;
