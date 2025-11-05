import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFetchData from "../../hooks/useFetchData";

const ResearchAres = () => {
  const [researchArea, isLoading] = useFetchData(
    "/researchArea",
    "researchArea"
  );
  console.log(researchArea);

  const renderSkeleton = () => (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 rounded-lg max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="hero bg-base-200 rounded-lg animate-pulse">
          <div className="hero-content flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-[40%] h-52 bg-base-300 rounded-lg" />
            <div className="space-y-3 w-full md:w-[60%]">
              <div className="h-6 w-3/4 md:w-4/5 bg-base-300 rounded" />
              <div className="h-24 md:h-28 bg-base-300 rounded w-full" />
              <div className="w-24 md:w-28 h-10 bg-primary-200 rounded border-b-8 border-primary-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-24 mx-auto ">
      <Helmet>
        <title>Research Areas - Peer Research Lab</title>
        <meta
          name="description"
          content="Explore our diverse research areas and departments at Peer Research Lab. Discover cutting-edge research projects across various academic disciplines and scientific fields."
        />
        <meta
          name="keywords"
          content="research areas, academic research departments, scientific research fields, peer research lab departments, research disciplines, academic research areas"
        />
        <meta
          property="og:title"
          content="Research Areas - Peer Research Lab"
        />
        <meta
          property="og:description"
          content="Explore our diverse research areas and departments at Peer Research Lab. Discover cutting-edge research projects across various academic disciplines and scientific fields."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Research Areas - Peer Research Lab"
        />
        <meta
          name="twitter:description"
          content="Explore our diverse research areas and departments at Peer Research Lab. Discover cutting-edge research projects across various academic disciplines and scientific fields."
        />
      </Helmet>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <div className="grid bg-gray-100 dark:bg-gray-900 p-2 md:p-5 lg:p-10 lg:grid-cols-2 grid-cols-1 gap-5 rounded-lg max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
          {researchArea.map((area) => (
            <div
              key={area._id}
              className="hero rounded-lg bg-gray-200 dark:bg-gray-950 dark:text-gray-200 text-gray-950"
            >
              <div className="hero-content flex-col md:flex-row ">
                <img
                  src={area.image}
                  alt={area.departmentName}
                  className="md:max-w-[40%] rounded-lg shadow-2xl"
                />
                <div className="space-y-3 md:max-w-[60%]">
                  <h1
                    className="text-2xl md:text-3xl font-bold line-clamp-1 cursor-default"
                    title={area.departmentName}
                  >
                    {area.departmentName}
                  </h1>
                  <p
                    className="text-justify line-clamp-3 cursor-default"
                    title={area.details}
                  >
                    {area.details}
                  </p>
                  <Link
                    to={`/researchAreaDetails/${area._id}`}
                    state={{ researchArea: area }}
                    className="
                    btn border-b-8 font-semibold
                     text-primary-900 hover:text-white dark:text-primary-900
                     hover:border-primary-600 border-primary-700  dark:border-primary-900 dark:hover:border-primary-700 
                     bg-primary-300 hover:bg-primary-500  dark:bg-primary-400 dark:hover:bg-primary-600 
                     transition-all duration-200"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchAres;
