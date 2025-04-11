import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const Vision = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const vision = {
    name: info.vision.name,
    details: info.vision.details,
    image: info.vision.image,
  };
  return (
    <div>
      <AboutPageDesign data={vision}></AboutPageDesign>
    </div>
  );
};

export default Vision;
