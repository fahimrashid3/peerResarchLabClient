import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://peer-resarch-lab-server.vercel.app",
  baseURL: "http://localhost:8000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
