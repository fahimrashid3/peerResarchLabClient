import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://peer-server-woad.vercel.app",
  // baseURL: "http://localhost:8000",
  baseURL: "https://api.peerresearchlab.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
