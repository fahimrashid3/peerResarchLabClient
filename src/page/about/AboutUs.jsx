import React from "react";
import useInfo from "../../hooks/useInfo";
import Loading from "../../components/Loading";
import AboutPageDesign from "./AboutPageDesign";
import AboutPageDesignRevers from "./AboutPageDesignRevers";
import ScrollToTop from "../../components/ScroolToTop";

const AboutUs = () => {
  const [info, infoLoading] = useInfo();

  if (infoLoading) {
    return <Loading />;
  }

  const overview = {
    name: info?.overView?.name || "Overview",
    details: info?.overView?.details || "No details available.",
    image: info?.overView?.image || "/default-image.jpg",
  };

  const mission = {
    name: info?.mission?.name || "Mission",
    details: info?.mission?.details || "No mission details found.",
    image: info?.mission?.image || "/default-image.jpg",
  };

  const history = {
    name: info?.history?.name || "History",
    details: info?.history?.details || "History information not available.",
    image: info?.history?.image || "/default-image.jpg",
  };

  const vision = {
    name: info?.vision?.name || "Vision",
    details: info?.vision?.details || "No vision statement provided.",
    image: info?.vision?.image || "/default-image.jpg",
  };

  return (
    <div className="space-y-20 pt-24">
      <AboutPageDesign data={overview} />
      <div className="divider divider-neutral font-bold">// \\</div>

      <AboutPageDesignRevers data={mission} />
      <div className="divider divider-neutral font-bold">// \\</div>

      <AboutPageDesign data={history} />
      <div className="divider divider-neutral font-bold">// \\</div>

      <AboutPageDesignRevers data={vision} />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
