import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import useInfo from "../../hooks/useInfo";

const History = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading></Loading>;
  }
  const history = info.labInformation.history;
  return (
    <div>
      <AboutPageDesign data={history}></AboutPageDesign>
    </div>
  );
};

export default History;
