import ScrollToTop from "../../components/ScroolToTop";
import Carousel from "./Carousel";
import ResentWorks from "./ResentWorks";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <ResentWorks></ResentWorks>
      <ScrollToTop />
    </div>
  );
};

export default Home;
