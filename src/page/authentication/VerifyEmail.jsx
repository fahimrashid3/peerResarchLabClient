import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Verify Your Email</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-primary-700">
          Verify Your Email
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-200">
          We've sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to verify your account.
          <br />
          After verifying, you can{" "}
          <Link to="/login" className="text-primary-600 underline">
            log in
          </Link>
          .
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn't receive the email? Please check your spam folder or try
          registering again.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
