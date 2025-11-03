import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useNews = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: news,
    isPending: newsLoading,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/news`);
      const raw = res?.data;
      if (Array.isArray(raw)) return raw;
      if (raw && Array.isArray(raw.data)) return raw.data;
      console.error(
        "Unexpected API response shape for /news. Expected array, received:",
        raw
      );
      return [];
    },
  });

  return [news, refetch, newsLoading];
};

export default useNews;
