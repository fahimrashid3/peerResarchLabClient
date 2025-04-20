import React from "react";
import useResearchPapers from "../../hooks/useResearchPapers";
import Loading from "../../components/Loading";
import PublicationsCard from "./PublicationCard";
import ScrollToTop from "../../components/ScroolToTop";

const Publications = () => {
  const [researchPaper, researchPaperLoading] = useResearchPapers();

  if (researchPaperLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-24 max-w-7xl mx-auto bg-dark-200">
      <div className="overflow-y-auto min-h-screen px-5 space-y-5 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] items-center">
        {researchPaper && researchPaper.length > 0 ? (
          researchPaper.map((paper) => (
            <PublicationsCard key={paper._id} paper={paper} />
          ))
        ) : (
          <p>No blogs found in this category</p>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Publications;
