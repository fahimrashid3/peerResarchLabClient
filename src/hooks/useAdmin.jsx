import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    isPending: isAdminLoading,
    error: adminError,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!user?.email, // Ensure user.email is truthy
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/user/admin/${user.email}`);
        return res.data?.admin; // Ensure the response has the expected structure
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
        throw new Error("Failed to fetch admin status");
      }
    },
  });

  return [isAdmin, isAdminLoading, adminError];
};

export default useAdmin;
