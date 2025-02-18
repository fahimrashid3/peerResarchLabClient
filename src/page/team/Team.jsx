import React from "react";
import useTeam from "../../hooks/useTeam";
import Loading from "../../components/Loading";
import SectionTitle from "../../components/SectionTitle";
import AdvisorCart from "./AdvisorCart";

const Team = () => {
  const [team, teamLoading] = useTeam();

  // Filter team members by role
  const advisors = team.filter((member) => member.role === "Advisor");
  const researchDirectors = team.filter(
    (member) => member.role === "Research Director"
  );
  const researchers = team.filter((member) => member.role === "Researcher");
  const researchAssistants = team.filter(
    (member) => member.role === "Research Assistant"
  );

  // Show loading spinner if data is still being fetched
  if (teamLoading) {
    return <Loading />;
  }

  // Log the filtered data for debugging
  console.log("total advisors", advisors);
  console.log("total researchDirectors", researchDirectors);
  console.log("total researchers", researchers);
  console.log("total researchAssistants", researchAssistants);

  return (
    <div className="pt-10">
      <div>
        <SectionTitle heading={"Advisor"} subHeading={"Guided by"} />
        {/* Render advisor cards */}
        {advisors.map((advisor) => (
          <AdvisorCart key={advisor._id} advisor={advisor} />
        ))}
      </div>
    </div>
  );
};

export default Team;
