import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useInfo = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: info = {},
    isLoading: infoLoading,
    refetch,
  } = useQuery({
    queryKey: ["labInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get("/labInfo");
      return res.data;
    },
  });

  return [info, infoLoading, refetch];
};

export default useInfo;
