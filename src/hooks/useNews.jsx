import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: news,
    isPending: newsLoading,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/news`);
      return res.data;
    },
  });

  return [news, refetch, newsLoading];
};

export default useNews;
