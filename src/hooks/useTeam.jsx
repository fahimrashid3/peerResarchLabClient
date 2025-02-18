import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useTeam = () => {
  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    // TODO: check the url
    axiosPublic.get("/team").then((res) => {
      setTeam(res.data);
      setTeamLoading(false);
    });
  }, [axiosPublic]);
  return [team, teamLoading];
};

export default useTeam;
