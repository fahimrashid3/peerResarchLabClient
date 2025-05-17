import React from "react";
import useTeam from "../../hooks/useTeam";
import Loading from "../../components/Loading";
import SectionTitle from "../../components/SectionTitle";
import AdvisorCard from "./AdvisorCard";
import ResearcherCard from "./ResearcherCard";
import AssistantCart from "./AssistantCart";
import ScrollToTop from "../../components/ScroolToTop";

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

  return (
    <div className="pt-10 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
      <div className=" space-y-5">
        <SectionTitle heading={"Advisor"} subHeading={"Guided by"} />
        {/* Render advisor cards */}
        {advisors.map((advisor) => (
          <AdvisorCard key={advisor._id} advisor={advisor} />
        ))}
      </div>
      <div>
        <SectionTitle heading={"Research Director"} subHeading={"Direct by"} />
        {/* Render advisor cards */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {researchDirectors.map((director) => (
            <ResearcherCard key={director._id} user={director} />
          ))}
        </div>
      </div>
      <div>
        <SectionTitle heading={"researchers"} subHeading={"Research with"} />
        {/* Render researcher cards */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {researchers.map((researcher) => (
            <ResearcherCard key={researcher._id} user={researcher} />
          ))}
        </div>
      </div>
      <div>
        <SectionTitle
          heading={"research Assistants"}
          subHeading={"Assist by"}
        />
        {/* Render researcher cards */}
        <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {researchAssistants.map((researchAssistant) => (
            <AssistantCart
              key={researchAssistant._id}
              researchAssistant={researchAssistant}
            />
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Team;
