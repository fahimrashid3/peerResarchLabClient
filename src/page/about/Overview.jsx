import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const Overview = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const overview = info.labInformation.overview;
  return (
    <div>
      <AboutPageDesign data={overview}></AboutPageDesign>
    </div>
  );
};

export default Overview;
