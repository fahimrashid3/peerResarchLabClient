import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ShortCard from "../../components/ShortCard";

const ResentWorks = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/resentResearchPapers");
        if (isMounted) setResearchPapers(res.data);
      } catch (error) {
        console.error("Error fetching research papers:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        <Link
          onClick={scrollToTop}
          to={"/publications"}
          className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default ResentWorks;
