import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import ShortCard from "../../components/ShortCard";
import useFetchData from "../../hooks/useFetchData";
import ScrollToTop from "../../components/ScrollToTop";

const RecentWorks = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [researchPapers, isLoading] = useFetchData(
    "/recentResearchPapers",
    "recentResearchPapers"
  );

  return (
    <div>
      <SectionTitle
        heading={"Recent Work"}
        subHeading={"Have a look"}
      ></SectionTitle>
      <div className="md:grid lg:grid-cols-2 gap-5 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto bg-dark-200 dark:bg-dark-900 p-10 rounded-2xl">
        {/* Loop through research papers and render ShortCard for each */}
        {researchPapers?.map((researchPaper) => (
          <ShortCard key={researchPaper._id} researchPaper={researchPaper} />
        ))}
      </div>
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
