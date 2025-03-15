import { useEffect, useState } from "react";
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
  console.log(openPositionDetails);
  return (
    <div className="pt-20">
      {openPositionDetails.map((position) => (
        <JoinUsSectionDesign data={position}></JoinUsSectionDesign>
      ))}
    </div>
  );
};

export default JoinUs;
