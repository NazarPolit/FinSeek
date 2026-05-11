import React, { useEffect, useState, useRef } from "react"; // Додали useRef в імпорт
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEmailAPI } from "../../Services/AuthService";
import { toast } from "react-toastify";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Confirming your email...");
  
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    console.log("Token from URL:", token);

    if (userId && token) {
      hasCalled.current = true;

      confirmEmailAPI(userId, token)
        .then(() => {
          toast.success("Email confirmed successfully!");
          setStatus("Success! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        })
        .catch((err) => {
          console.error("Confirmation error:", err);
          setStatus("Confirmation failed. The link may be expired or already used.");
          toast.error("Link expired or already used.");
        });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
        <div className="text-4xl mb-4">📧</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Email Confirmation</h2>
        <p className="text-slate-600 font-medium">{status}</p>
        <div className="mt-6">
           <div className="w-8 h-8 border-4 border-brandBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;