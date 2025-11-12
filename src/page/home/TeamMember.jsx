import React from "react";
import useFetchData from "../../hooks/useFetchData";
import SectionTitle from "../../components/SectionTitle";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const TeamMember = () => {
  const [team, teamLoading] = useFetchData("/team", "team");

  const advisors = team.filter((member) => member.role === "Advisor");
  const directors = team.filter(
    (member) => member.role === "Research Director"
  );

  const members = [...advisors, ...directors].slice(0, 6);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        heading={"Team Members"}
        subHeading={"Brains behind it"}
      ></SectionTitle>
      <div className="bg-gray-100 dark:bg-gray-900 w-full mx-auto p-2  md:p-8 rounded-xl mt-6 md:mt-8">
        {teamLoading ? (
          <p className="text-center py-10 md:py-12 text-gray-500 dark:text-gray-300 text-sm md:text-base">
            Loading team...
          </p>
        ) : members.length === 0 ? (
          <p className="text-center py-10 md:py-12 text-gray-500 dark:text-gray-300 text-sm md:text-base">
            No advisors found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {members.map((member) => (
              <div className="w-full flex justify-center" key={member._id}>
                <UserCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-6 md:mt-8 mb-4 md:mb-6">
        <Link
          onClick={scrollToTop}
          to={"/team"}
          className="btn border-b-4 md:border-b-8 font-semibold text-sm md:text-base px-6 md:px-8 py-2 md:py-3 text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 dark:text-white dark:bg-primary-700 dark:border-primary-900 dark:hover:bg-primary-600 dark:hover:border-primary-700 transition-all duration-200 rounded-lg"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default TeamMember;
