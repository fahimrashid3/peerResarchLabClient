import React from "react";
import { Helmet } from "react-helmet";
import useTeam from "../../hooks/useTeam";
import Loading from "../../components/Loading";
import SectionTitle from "../../components/SectionTitle";
import AdvisorCard from "./AdvisorCard";
import ResearcherCard from "./ResearcherCard";
import AssistantCart from "./AssistantCart";
import ScrollToTop from "../../components/ScrollToTop";

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
      <Helmet>
        <title>Our Team - Peer Research Lab</title>
        <meta
          name="description"
          content="Meet our dedicated team of researchers, advisors, and research assistants at Peer Research Lab. Learn about our experts driving innovation and academic excellence."
        />
        <meta
          name="keywords"
          content="research team, academic researchers, research advisors, research assistants, peer research lab team, scientific experts"
        />
        <meta property="og:title" content="Our Team - Peer Research Lab" />
        <meta
          property="og:description"
          content="Meet our dedicated team of researchers, advisors, and research assistants at Peer Research Lab. Learn about our experts driving innovation and academic excellence."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Team - Peer Research Lab" />
        <meta
          name="twitter:description"
          content="Meet our dedicated team of researchers, advisors, and research assistants at Peer Research Lab. Learn about our experts driving innovation and academic excellence."
        />
      </Helmet>
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
            <div className="mx-auto">
              <ResearcherCard key={director._id} user={director} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle heading={"researchers"} subHeading={"Research with"} />
        {/* Render researcher cards */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {researchers.map((researcher) => (
            <div className="mx-auto">
              <ResearcherCard key={researcher._id} user={researcher} />
            </div>
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
            <div className="mx-auto">
              <AssistantCart
                key={researchAssistant._id}
                researchAssistant={researchAssistant}
              />
            </div>
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Team;
