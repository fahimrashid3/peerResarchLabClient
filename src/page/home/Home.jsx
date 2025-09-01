import ScrollToTop from "../../components/ScrollToTop";
import Carousel from "./Carousel";
import RecentWorks from "./ResentWorks";
import OurCollaboration from "./OurCollaboration";
import TeamMember from "./TeamMember";

const Home = () => {
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
      <TeamMember />
      <OurCollaboration />
    </div>
  );
};

export default Home;
