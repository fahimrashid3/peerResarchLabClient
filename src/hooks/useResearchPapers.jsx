import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useResearchPapers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: researchPaper, isPending: researchPaperLoading } = useQuery({
    queryKey: ["researchPapers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/researchPapers`);
      return res.data;
    },
  });

  return [researchPaper, researchPaperLoading];
};

export default useResearchPapers;
