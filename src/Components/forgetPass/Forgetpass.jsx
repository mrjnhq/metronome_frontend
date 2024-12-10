import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Clear errors and simulate API call
    setError("");
    setMessage("If the email exists, a reset link will be sent.");
    setEmail("");

    // Simulated API request
    console.log("Sending reset link to:", email);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Forgot Password?</h2>
      <p className="text-sm text-gray-600 mb-6">
        Enter your email address below and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Reset Link
        </button>
      </form>
      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      {message && <p className="text-sm text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
