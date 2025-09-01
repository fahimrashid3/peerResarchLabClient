import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const ResearchAreasDetails = () => {
  const location = useLocation();
  const { researchArea } = location.state || {};

  if (!researchArea) return <Loading />;

  return (
    <div className="pt-24 max-w-7xl mx-auto min-h-screen space-y-8">
      {/* Department Name */}
      <p className="font-bold text-3xl text-primary-800">
        {researchArea.departmentName}
      </p>

      {/* Department Image and Details */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <img
          src={researchArea.image}
          alt={researchArea.departmentName}
          className="max-w-md rounded-lg shadow-2xl"
        />
        <p className="text-justify text-lg leading-relaxed text-dark-900 dark:text-white">
          {researchArea.details}
        </p>
      </div>

      {/* Sub Departments */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">
          Sub Departments
        </h2>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {researchArea.subDepartments.map((subDept, index) => (
            <div
              key={index}
              className="bg-primary-400 hover:bg-primary-500 transition-all duration-300 p-6 rounded-lg text-dark-200 hover:text-white border-l-4 hover:border-l-8 border-yellow-400"
            >
              <p className="font-bold text-xl mb-2">{subDept.name}</p>
              <p className="text-base">{subDept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchAreasDetails;
