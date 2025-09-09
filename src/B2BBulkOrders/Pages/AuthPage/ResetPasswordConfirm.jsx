// src/pages/auth/ResetPasswordConfirm.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import DVYBLogo from "../../../CommonPages/DVYBLogo";

const ResetPasswordConfirm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const oobCode = new URLSearchParams(search).get("oobCode");

  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [stage, setStage] = useState("verifying"); // verifying | ready | success | error
  const [err, setErr] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!oobCode) {
        setStage("error");
        setErr("Invalid or missing reset code.");
        return;
      }
      try {
        const verifiedEmail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(verifiedEmail);
        setStage("ready");
      } catch (e) {
        setStage("error");
        setErr("This reset link is invalid or has expired.");
      }
    };
    verify();
  }, [oobCode]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (newPass.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }
    if (newPass !== confirm) {
      setErr("New password and confirm password do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPass);
      setStage("success");
    } catch (e) {
      setErr("Could not reset password. Please try again or request a new link.");
    }
  };

  if (stage === "verifying") {
    return (
      <>
        <DVYBLogo />
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-700">Verifying link…</p>
        </div>
      </>
    );
  }

  if (stage === "error") {
    return (
      <>
        <DVYBLogo />
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md w-full px-8">
            <p className="text-red-600">{err}</p>
            <button
              onClick={() => navigate("/reset-password")}
              className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-md"
            >
              Request new link
            </button>
          </div>
        </div>
      </>
    );
  }

  if (stage === "success") {
    return (
      <>
        <DVYBLogo />
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md w-full px-8 text-center space-y-4">
            <h2 className="text-xl font-semibold">Your password has been changed</h2>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-900 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  // stage === "ready"
  return (
    <>
      <DVYBLogo />
      <div className="flex min-h-screen">
        <div className="hidden md:flex w-1/2">{/* image here */}</div>
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
          <div className="w-full max-w-md px-8">
            <h1 className="text-2xl font-semibold text-blue-900 mb-2">Create New Password</h1>
            <p className="text-sm text-gray-600 mb-6">Resetting for <b>{email}</b></p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordConfirm;
