import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScroolToTop";
import SectionTitle from "../../components/SectionTitle";
import useTeam from "../../hooks/useTeam";
import Carousel from "./Carousel";
import RecentWorks from "./ResentWorks";
import UserCard from "./UserCard";

const Home = () => {
  const [team, teamLoading] = useTeam();

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
      <Carousel />
      <RecentWorks />
      <ScrollToTop />
      <SectionTitle
        heading={"Team Members"}
        subHeading={"Brains behind it"}
      ></SectionTitle>
      <div className="bg-dark-200 max-w-7xl mx-auto p-5 rounded-xl">
        {teamLoading ? (
          <p className="text-center mt-10 text-gray-500">Loading team...</p>
        ) : members.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No advisors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5">
            {members.map((member) => (
              <UserCard key={member._id} member={member} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center my-5 md:my-10">
        <Link
          onClick={scrollToTop}
          to={"/team"}
          className="btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default Home;
