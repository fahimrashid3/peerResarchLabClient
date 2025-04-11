import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const Mission = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const mission = {
    name: info.mission.name,
    details: info.mission.details,
    image: info.mission.image,
  };
  return (
    <div>
      <AboutPageDesign data={mission}></AboutPageDesign>
    </div>
  );
};

export default Mission;
