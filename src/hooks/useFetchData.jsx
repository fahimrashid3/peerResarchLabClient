import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFetchData = (url, key) => {
  const axiosPublic = useAxiosPublic();
  const {
    data = [],
    isLoading,
    refetch,
    isPending,
  } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });
  return [data, isLoading, refetch, isPending];
};

export default useFetchData;
