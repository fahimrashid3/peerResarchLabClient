import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import PendingPaperCard from "./PendingPaperCard";

const PendingPaper = () => {
  const axiosSecure = useAxiosSecure();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/pendingPaper").then((res) => {
      setPapers(res.data);
    });
  }, [axiosSecure]);
  if (!papers) {
    return <Loading />;
  }
  return (
    <div>
      {papers.map((paper) => (
        <PendingPaperCard key={paper._id} researchPaper={paper} />
      ))}
    </div>
  );
};

export default PendingPaper;
