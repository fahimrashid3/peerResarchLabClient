import React from "react";
import useResearchPapers from "../../hooks/useResearchPapers";
import Loading from "../../components/Loading";
import PublicationsCard from "./PublicationCard";
import ScrollToTop from "../../components/ScroolToTop";
import useInfo from "../../hooks/useInfo";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Publications = () => {
  const [researchPaper, researchPaperLoading] = useResearchPapers();
  const [info] = useInfo();

  if (researchPaperLoading) {
    return <Loading />;
  }

  const [firstPaper, ...otherPapers] = researchPaper || [];

  return (
    <div className="pt-24 ">
      {firstPaper && (
        <div className="bg-primary-900">
          <div className=" text-white mb-16 px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
            {/* Left - Text Content */}
            <div className="max-w-xl space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                The latest research from{" "}
                <span className=" text-primary-500">{info.name}</span>
              </h1>
              <div className="space-x-4">
                <span className="text-sm font-semibold text-gray-400">
                  FOLLOW US
                </span>
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={info?.socialMedia?.facebook || "#"}
                    className="text-blue-500 hover:text-blue-700 text-3xl"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={info?.socialMedia?.linkedIn || "#"}
                    className="text-blue-500 hover:text-blue-700 text-3xl"
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={info?.socialMedia?.X || "#"}
                    className="text-blue-500 hover:text-blue-700 text-3xl"
                    target="_blank"
                  >
                    <FaXTwitter />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Paper Card */}
            <PublicationsCard key={firstPaper._id} paper={firstPaper} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto bg-dark-200 px-5">
        {/* Other Papers */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5">
          {otherPapers && otherPapers.length > 0 ? (
            otherPapers.map((paper) => (
              <PublicationsCard key={paper._id} paper={paper} />
            ))
          ) : (
            <p className="min-h-screen flex justify-center items-center">
              No more research papers found.
            </p>
          )}
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
};

export default Publications;
