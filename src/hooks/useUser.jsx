import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    loading,
    refetch,
  } = useQuery({
    queryKey: [`users_${user?.email || "no-email"}`],
    queryFn: async () => {
      if (!user) {
        return []; // Return empty array if user is not found yet
      }
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });

  return [users, loading, refetch];
};
export default useUsers;
