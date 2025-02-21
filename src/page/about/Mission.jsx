import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const Mission = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const mission = info.labInformation.mission;
  return (
    <div>
      <AboutPageDesign data={mission}></AboutPageDesign>
    </div>
  );
};

export default Mission;
