import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const Overview = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const overview = {
    name: info.overView.name,
    details: info.overView.details,
    image: info.overView.image,
  };

  return (
    <div>
      <AboutPageDesign data={overview}></AboutPageDesign>
    </div>
  );
};

export default Overview;
