import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://api.peerresearchlab.com",
});

let networkErrorCount = 0;
let lastNetworkErrorTime = 0;
const NETWORK_ERROR_THROTTLE_MS = 5000; // Only log network errors every 5 seconds

const setupInterceptors = (logOut, navigate) => {
  // Check if interceptors are already set up (both request and response)
  if (
    axiosSecure.interceptors.request.handlers.length > 0 &&
    axiosSecure.interceptors.response.handlers.length > 0
  ) {
    return;
  }

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        if (config.url?.includes("/user")) {
          console.log(
            "Request interceptor - Adding token to request:",
            config.url
          );
          console.log("Token exists:", !!token);
        }
      } else {
        console.warn("No token found in localStorage for request:", config.url);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      networkErrorCount = 0;
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const url = error.config?.url || "unknown endpoint";

        // Handle 401 Unauthorized - token expired or invalid
        // Only logout if it's not a JWT token generation request (which uses axiosPublic anyway)
        // and if the user is actually logged out or token is truly invalid
        if (status === 401) {
          const token = localStorage.getItem("access-token");
          // Check if token exists - if it does but we got 401, it might be expired
          // If no token exists, don't logout - user might be in the process of getting one
          if (token) {
            // Token exists but invalid - likely expired
            localStorage.removeItem("access-token");
            // Only logout if we're not already on login page
            if (navigate && window.location.pathname !== "/login") {
              if (logOut) {
                logOut();
              }
              navigate("/login");
            }
          }
          // If no token exists, don't logout - might be getting token
        }

        // Only log actual HTTP errors, not network errors
        if (status >= 400) {
          console.error(
            `API Error [${status}]: ${url}`,
            error.response.data?.message || error.message
          );
        }
      } else if (error.code !== "ERR_CANCELED") {
        // Throttle network error logging to avoid console spam
        const now = Date.now();
        const isNetworkError =
          error.message === "Network Error" ||
          error.code === "ERR_NETWORK" ||
          error.code === "ECONNREFUSED";

        if (isNetworkError) {
          networkErrorCount++;
          const url = error.config?.url || "unknown endpoint";

          // Only log if enough time has passed since last log
          if (now - lastNetworkErrorTime > NETWORK_ERROR_THROTTLE_MS) {
            console.error(
              `⚠️ Network Error: Unable to reach server at ${axiosSecure.defaults.baseURL}\n` +
                `Failed request: ${url}\n` +
                `Total errors since last log: ${networkErrorCount}\n` +
                `Please ensure the backend server is running on port 8000.`
            );
            lastNetworkErrorTime = now;
            networkErrorCount = 0; // Reset after logging
          }
        } else {
          // Log other non-cancelled errors normally
          const url = error.config?.url || "unknown endpoint";
          console.error(`Request Error [${url}]:`, error.message);
        }
      }

      return Promise.reject(error);
    }
  );
};

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  setupInterceptors(logOut, navigate);

  return axiosSecure;
};

export default useAxiosSecure;
