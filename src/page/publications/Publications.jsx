import React from "react";
import useResearchPapers from "../../hooks/useResearchPapers";
import Loading from "../../components/Loading";
import PublicationsCard from "../../components/PublicationsCard";

const Publications = () => {
  const [researchPaper, researchPaperLoading] = useResearchPapers();

  // Log the fetched data
  console.log("Research Papers in Publications:", researchPaper);

  if (researchPaperLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-16">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
        {/* Filter Section */}
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <div className="pt-10">
            <p>Filter functionalities will be added in this side</p>
          </div>
        </div>

        {/* Blog Section */}
        <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5 space-y-5">
          {researchPaper && researchPaper.length > 0 ? (
            researchPaper.map((paper) => (
              <PublicationsCard key={paper._id} paper={paper} />
            ))
          ) : (
            <p>No blogs found in this category</p>
          )}
        </div>

        {/* Additional Content Section */}
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <h1 className="font-semibold text-xl mb-2">Additional content</h1>
          <h1>We can show anything in this section</h1>
        </div>
      </div>
    </div>
  );
};

export default Publications;
