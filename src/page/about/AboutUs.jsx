import React from "react";
import useInfo from "../../hooks/useInfo";
import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import AboutPageDesignRevers from "./AboutPageDesignRevers";

const AboutUs = () => {
  const [info, infoLoading] = useInfo();
  if (infoLoading) {
    return <Loading />;
  }
  const history = {
    name: info.history.name,
    details: info.history.details,
    image: info.history.image,
  };
  const mission = {
    name: info.mission.name,
    details: info.mission.details,
    image: info.mission.image,
  };
  const overview = {
    name: info.overView.name,
    details: info.overView.details,
    image: info.overView.image,
  };
  const vision = {
    name: info.vision.name,
    details: info.vision.details,
    image: info.vision.image,
  };
  return (
    <div className="space-y-20 pt-24">
      <AboutPageDesign data={overview}></AboutPageDesign>
      <div className="divider divider-neutral font-bold">// \\</div>
      <AboutPageDesignRevers data={mission}></AboutPageDesignRevers>
      <div className="divider divider-neutral font-bold">// \\</div>
      <AboutPageDesign data={history}></AboutPageDesign>
      <div className="divider divider-neutral font-bold">// \\</div>
      <AboutPageDesignRevers data={vision}></AboutPageDesignRevers>
    </div>
  );
};

export default AboutUs;
