import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Assuming this hook is already set up
import ShortCard from "../../components/shortCard"; // Assuming this component is already set up
import SectionTitle from "../../components/SectionTitle";

const ResentWorks = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const axiosPublic = useAxiosPublic(); // Initialize axiosPublic instance

  useEffect(() => {
    let isMounted = true; // Prevents state updates on unmounted component

    const fetchData = async () => {
      try {
        // Get the top research papers
        const res = await axiosPublic.get("/resentResearchPapers");
        if (isMounted) setResearchPapers(res.data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching research papers:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <SectionTitle
        heading={"Resent Work"}
        subHeading={"Have a look"}
      ></SectionTitle>
      <div className="md:grid lg:grid-cols-2 gap-5 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
        {/* Loop through research papers and render ShortCard for each */}
        {researchPapers.map((researchPaper) => (
          <ShortCard key={researchPaper._id} researchPaper={researchPaper} />
        ))}
      </div>
      <div className="flex items-center justify-center my-5 md:my-10">
        <button className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200">
          Show more
        </button>
      </div>
    </div>
  );
};

export default ResentWorks;
