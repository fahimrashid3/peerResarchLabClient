import React from "react";
import { Helmet } from "react-helmet";
import useResearchPapers from "../../hooks/useResearchPapers";
import Loading from "../../components/Loading";
import PublicationsCard from "./PublicationCard";
import ScrollToTop from "../../components/ScrollToTop";
import useInfo from "../../hooks/useInfo";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
// import { Link } from "react-router-dom";

const Publications = () => {
  const [researchPaper, researchPaperLoading] = useResearchPapers();
  const [info] = useInfo();

  if (researchPaperLoading) {
    return <Loading />;
  }

  const [firstPaper, ...otherPapers] = researchPaper || [];

  return (
    <div className="pt-24 ">
      <Helmet>
        <title>Publications - Peer Research Lab</title>
        <meta
          name="description"
          content="Explore our latest research publications and academic papers. Discover cutting-edge research findings and scientific contributions from Peer Research Lab."
        />
        <meta
          name="keywords"
          content="research publications, academic papers, scientific research, peer research lab publications, research findings, academic journals"
        />
        <meta property="og:title" content="Publications - Peer Research Lab" />
        <meta
          property="og:description"
          content="Explore our latest research publications and academic papers. Discover cutting-edge research findings and scientific contributions from Peer Research Lab."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Publications - Peer Research Lab" />
        <meta
          name="twitter:description"
          content="Explore our latest research publications and academic papers. Discover cutting-edge research findings and scientific contributions from Peer Research Lab."
        />
      </Helmet>
      {firstPaper && (
        <div className="bg-primary-900">
          <div className=" text-white mb-16 px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
            {/* Left - Text Content */}
            <div className="max-w-xl space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                What’s New at{" "}
                <span className=" text-primary-500">{info.name}</span>
              </h1>
              <div className="md:space-x-4">
                <span className="text-sm font-semibold text-gray-400">
                  FOLLOW US
                </span>
                <div className="flex items-center md:gap-4 pt-2">
                  <a
                    href={info?.socialMedia?.facebook || "#"}
                    className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={info?.socialMedia?.linkedIn || "#"}
                    className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={info?.socialMedia?.X || "#"}
                    className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
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

      <div className="max-w-7xl mx-auto bg-dark-200 rounded-lg dark:bg-dark-900">
        {/* Other Papers */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5 pt-5">
          {otherPapers && otherPapers.length > 0 ? (
            otherPapers.map((paper) => (
              <div className="mx-auto">
                <PublicationsCard key={paper._id} paper={paper} />
              </div>
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
