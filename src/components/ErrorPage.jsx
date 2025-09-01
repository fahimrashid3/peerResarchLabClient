import { useRouteError, Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Handle invalid routes specifically
  const isInvalidRoute =
    error?.status === 404 ||
    error?.message?.includes("No route matches") ||
    error?.message?.includes("No match");

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800">
      <div className="text-center p-8 max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          {isInvalidRoute ? "Page Not Found" : "Oops!"}
        </h1>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
          {isInvalidRoute
            ? "The page you're looking for doesn't exist"
            : "Something went wrong"}
        </h2>

        {isInvalidRoute ? (
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The URL you entered doesn't match any of our pages. Please check the
            address or use the navigation below.
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We're sorry, but something unexpected happened. Please try again.
          </p>
        )}

        {/* Error Details (only in development) */}
        {import.meta.env.DEV && error && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
              <strong>Status:</strong> {error.status || "Unknown"}
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
              <strong>Message:</strong> {error.message || "No message"}
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
              <strong>URL:</strong> {window.location.pathname}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-block w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Home
          </Link>

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link
            to="/aboutUs"
            className="text-sm text-primary-500 hover:text-primary-600 underline"
          >
            About Us
          </Link>
          <Link
            to="/team"
            className="text-sm text-primary-500 hover:text-primary-600 underline"
          >
            Our Team
          </Link>
          <Link
            to="/publications"
            className="text-sm text-primary-500 hover:text-primary-600 underline"
          >
            Publications
          </Link>
          <Link
            to="/news"
            className="text-sm text-primary-500 hover:text-primary-600 underline"
          >
            News
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Need help? Contact our support team.</p>
          <Link
            to="/contactUs"
            className="text-primary-500 hover:text-primary-600 underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
