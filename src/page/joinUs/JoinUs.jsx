import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import JoinUsSectionDesign from "./JoinUsSectionDesign";

const JoinUs = () => {
  const axiosPublic = useAxiosPublic();
  const [openPositionDetails, setOpenPositionDetails] = useState([]);

  useEffect(() => {
    axiosPublic.get("/openPositions").then((res) => {
      setOpenPositionDetails(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="pt-20">
      <Helmet>
        <title>Join Us - Peer Research Lab</title>
        <meta
          name="description"
          content="Join our research team at Peer Research Lab. Explore open positions and career opportunities in academic research. Be part of our innovative research community."
        />
        <meta
          name="keywords"
          content="join peer research lab, research job opportunities, academic research careers, research positions, research lab jobs, peer research lab careers"
        />
        <meta property="og:title" content="Join Us - Peer Research Lab" />
        <meta
          property="og:description"
          content="Join our research team at Peer Research Lab. Explore open positions and career opportunities in academic research. Be part of our innovative research community."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join Us - Peer Research Lab" />
        <meta
          name="twitter:description"
          content="Join our research team at Peer Research Lab. Explore open positions and career opportunities in academic research. Be part of our innovative research community."
        />
      </Helmet>
      {openPositionDetails.map((position) => (
        <JoinUsSectionDesign data={position}></JoinUsSectionDesign>
      ))}
    </div>
  );
};

export default JoinUs;
