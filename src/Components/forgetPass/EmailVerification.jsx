import React, { useState } from "react";

const EmailVerification = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the code is empty
    if (!code) {
      setError("Verification code is required.");
      return;
    }

    // Simulate code verification
    if (code === "123456") {
      setMessage("Verification successful!");
      setError("");
      setCode("");
    } else {
      setError("Invalid verification code. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Verify Your Account</h2>
      <p className="text-sm text-gray-600 mb-6">
        Enter the 6-digit code we sent to your email or phone number.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          maxLength="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Verify
        </button>
      </form>
      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      {message && <p className="text-sm text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default EmailVerification;
