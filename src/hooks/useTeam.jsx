import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTeam = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: team = [],
    isLoading: teamLoading,
    refetch,
  } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await axiosPublic.get("/team");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes
  });

  return [team, teamLoading, refetch];
};

export default useTeam;
