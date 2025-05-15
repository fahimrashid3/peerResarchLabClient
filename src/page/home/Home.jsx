import ScrollToTop from "../../components/ScroolToTop";
import Carousel from "./Carousel";
import RecentWorks from "./ResentWorks";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <RecentWorks></RecentWorks>
      <ScrollToTop />
    </div>
  );
};

export default Home;
