import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useInfo = () => {
  const [info, setInfo] = useState([]);
  const [infoLoading, setInfoLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/labInfo").then((res) => {
      setInfo(res.data);
      setInfoLoading(false);
    });
  }, [axiosPublic]);
  return [info, infoLoading];
};

export default useInfo;
