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
    <div>
      <SectionTitle
        heading={"Team Members"}
        subHeading={"Brains behind it"}
      ></SectionTitle>
      <div className="bg-gray-100 dark:bg-gray-900 max-w-7xl mx-auto p-5 rounded-xl">
        {teamLoading ? (
          <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
            Loading team...
          </p>
        ) : members.length === 0 ? (
          <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
            No advisors found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 ">
            {members.map((member) => (
              <div className="mx-auto" key={member._id}>
                <UserCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center my-5 md:my-10">
        <Link
          onClick={scrollToTop}
          to={"/team"}
          className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 dark:text-white dark:bg-primary-700 dark:border-primary-900 dark:hover:bg-primary-600 dark:hover:border-primary-700 transition-all duration-200"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default TeamMember;
