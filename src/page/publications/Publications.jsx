import React from "react";
import useResearchPapers from "../../hooks/useResearchPapers";
import Loading from "../../components/Loading";
import PublicationsCard from "../../components/PublicationsCard";

const Publications = () => {
  const [researchPaper, researchPaperLoading] = useResearchPapers();

  // Log the fetched data
  console.log("Research Papers in Publications:", researchPaper);

  if (researchPaperLoading) {
    return (
      <div className="pt-16">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
          <div className=" space-y-3 pl-5">
            <div className="skeleton h-10 w-72"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
          </div>

          {/* middle section  */}
          <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
          </div>

          {/* middle section */}
        </div>
      </div>
    );
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
