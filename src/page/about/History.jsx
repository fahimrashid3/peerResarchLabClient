import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const History = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const history = {
    name: info.history.name,
    details: info.history.details,
    image: info.history.image,
  };
  return (
    <div>
      <AboutPageDesign data={history}></AboutPageDesign>
    </div>
  );
};

export default History;
