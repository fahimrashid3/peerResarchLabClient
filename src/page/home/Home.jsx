import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Peer Research Lab</title>
        <meta
          name="description"
          content="Welcome to Peer Research Lab - A collaborative research community advancing knowledge and innovation through cutting-edge research projects."
        />
        <meta
          name="keywords"
          content="research lab, peer research, academic research, scientific research, research collaboration, innovation"
        />
        <meta property="og:title" content="Peer Research Lab - Home" />
        <meta
          property="og:description"
          content="Welcome to Peer Research Lab - A collaborative research community advancing knowledge and innovation through cutting-edge research projects."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peer Research Lab - Home" />
        <meta
          name="twitter:description"
          content="Welcome to Peer Research Lab - A collaborative research community advancing knowledge and innovation through cutting-edge research projects."
        />
      </Helmet>
      <Carousel />
      <RecentWorks />
      <ScrollToTop />
      <TeamMember />
      <OurCollaboration />
    </div>
  );
};

export default Home;
