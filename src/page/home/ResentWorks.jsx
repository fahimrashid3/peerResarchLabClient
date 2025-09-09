import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import ShortCard from "../../components/ShortCard";
import useFetchData from "../../hooks/useFetchData";

const RecentWorks = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [researchPapers, isLoading, refetch, isPending] = useFetchData(
    "/recentResearchPapers",
    "recentResearchPapers"
  );

  return (
    <div className="my-12">
      <SectionTitle
        heading={"Recent Work"}
        subHeading={"Have a look"}
      ></SectionTitle>

      {/* Loading State */}
      {(isLoading || isPending) && (
        <div className="text-center py-10">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-gray-500 mt-4">Loading recent works...</p>
        </div>
      )}

      {/* Data Display */}
      {!isLoading &&
        !isPending &&
        researchPapers &&
        researchPapers.length > 0 && (
          <div className="md:grid lg:grid-cols-2 gap-5 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto bg-dark-200 dark:bg-dark-900 p-10 rounded-2xl">
            {researchPapers.map((researchPaper) => (
              <ShortCard
                key={researchPaper._id}
                researchPaper={researchPaper}
              />
            ))}
          </div>
        )}

      {/* Empty State */}
      {!isLoading &&
        !isPending &&
        (!researchPapers || researchPapers.length === 0) && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No recent works found.</p>
            <button
              onClick={() => refetch()}
              className="btn btn-sm btn-primary"
            >
              Retry
            </button>
          </div>
        )}

      {/* Show More Button - Always visible */}
      <div className="flex items-center justify-center my-5 md:my-10">
        <Link
          onClick={scrollToTop}
          to={"/publications"}
          className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 dark:text-white dark:bg-primary-700 dark:border-primary-900 dark:hover:bg-primary-600 dark:hover:border-primary-700 transition-all duration-200"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default RecentWorks;
