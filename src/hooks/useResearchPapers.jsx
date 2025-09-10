import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useResearchPapers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: researchPaper, isPending: researchPaperLoading } = useQuery({
    queryKey: ["researchPapers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/researchPapers`);
      return res.data;
    },
  });

  return [researchPaper, researchPaperLoading];
};

export default useResearchPapers;
