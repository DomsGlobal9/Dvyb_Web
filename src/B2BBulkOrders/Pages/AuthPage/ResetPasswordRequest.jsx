// src/pages/auth/ResetPasswordRequest.jsx
import React, { useState } from "react";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import DVYBLogo from "../../Components/common/DVYBLogo";
import frameB2BBulkOrders from "../../../assets/AuthImages/B2BLogin_frame.png";

const actionCodeSettings = {
  // After user sets a new password on Firebase’s page,
  // they’ll be redirected here (optional).
  url: `${window.location.origin}/reset-password/confirm`,
  // Do NOT set handleCodeInApp for password resets.
  // (It’s for email-link sign-in; password reset works fine without it.)
};

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const mapError = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email.";
      case "auth/missing-email":
        return "Email is required.";
      case "auth/user-not-found":
        return "We can’t find that email.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
      setSent(true);
    } catch (error) {
      setErr(mapError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setErr("");
    try {
      await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
    } catch (error) {
      setErr(mapError(error.code));
    }
  };

  return (
    <>
      <DVYBLogo />
      <div className="flex min-h-screen">
        {/* Left image (optional) */}
      {/* Left Image Section */}
              <div className="hidden md:flex w-1/2">
                <img
                  src={frameB2BBulkOrders}
                  alt="Traditional Clothing"
                  className="w-full h-full object-cover"
                />
              </div>

        {/* Right panel */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
          <div className="w-full max-w-md px-8">
            <h1 className="text-2xl font-semibold text-blue-900 mb-2">Reset Your Password</h1>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email and we’ll send a link to reset your password.
            </p>

            {!sent ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                      err ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Check Email</h2>
                <p className="text-sm text-gray-600">
                  We sent a password reset link to <b>{email}</b>. Click the link in that email
                  to set a new password. Didn’t get it?{" "}
                  <button onClick={resend} className="text-blue-600 hover:underline">
                    Click here to resend
                  </button>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordRequest;
