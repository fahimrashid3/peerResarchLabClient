import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUsers = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Check if token exists
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("access-token");

  const {
    data: users = null,
    isLoading: loading,
    refetch,
    error,
  } = useQuery({
    queryKey: [`user_profile_${user?.email || "no-email"}`],
    enabled: !!user?.email && hasToken && !authLoading, // Only run query when user email exists, token is available, and auth is not loading
    queryFn: async () => {
      if (!user?.email) {
        return null;
      }

      try {
        // Check if token exists before making request
        const token = localStorage.getItem("access-token");
        if (!token) {
          console.error("No access token found in localStorage");
          return null;
        }

        console.log("Fetching user with email:", user.email);
        console.log("Token exists:", !!token);
        console.log("Token preview:", token.substring(0, 20) + "...");

        const res = await axiosSecure.get(`/user?email=${user.email}`);
        console.log("User API response:", res.data);
        // Backend returns null if user not found, or user object if found
        return res.data || null;
      } catch (error) {
        // Log detailed error information
        console.error("Error fetching user:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });

        // Return null on error instead of throwing
        // This allows the component to handle the error state gracefully
        if (error.response?.status === 404) {
          // User not found in database - not necessarily an error
          console.log("User not found in database");
          return null;
        }

        if (error.response?.status === 401) {
          // Unauthorized - token issue
          console.error("Unauthorized - token may be invalid or expired");
          console.error("Error details:", error.response.data);

          // Try to get a new token
          const token = localStorage.getItem("access-token");
          if (token) {
            console.log(
              "Current token (first 20 chars):",
              token.substring(0, 20)
            );
          }
        }

        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return [users, loading, refetch];
};

export default useUsers;
