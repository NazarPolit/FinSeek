import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { resendConfirmationAPI } from "../../Services/AuthService";
import { toast } from "react-toastify";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { loginUser } = useAuth();
  const [showResend, setShowResend] = useState(false);
  const [emailForResend, setEmailForResend] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginFormsInputs) => {
    try {
      setShowResend(false);
      await loginUser(form.userName, form.password);
    } catch (e: any) {
      const errorData = e?.response?.data;
      if (typeof errorData === "string" && errorData.toLowerCase().includes("confirm your email")) {
        setShowResend(true);
      }
    }
  };

  const handleResend = async () => {
    if (!emailForResend) {
      toast.warning("Please enter your email to receive a new link");
      return;
    }
    try {
      await resendConfirmationAPI(emailForResend);
      toast.info("A new confirmation link has been sent to your email.");
      setShowResend(false);
    } catch (e) {
      toast.error("Could not resend link. Make sure the email is correct.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-center pt-8 pb-28 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to FinSeek
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to access your financial dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-100 sm:rounded-xl sm:px-10">
          
          {showResend && (
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg animate-fadeIn">
              <p className="text-sm text-indigo-800 mb-3 font-medium">
                It seems your email is not confirmed.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={emailForResend}
                  onChange={(e) => setEmailForResend(e.target.value)}
                />
                <button
                  onClick={handleResend}
                  className="px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Resend Link
                </button>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className={`appearance-none block w-full px-4 py-2.5 border ${
                    errors.userName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-slate-300 focus:ring-brandBlue focus:border-brandBlue"
                  } rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors`}
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.userName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`appearance-none block w-full px-4 py-2.5 border ${
                    errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-slate-300 focus:ring-brandBlue focus:border-brandBlue"
                  } rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors`}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to="#" className="font-semibold text-brandBlue hover:text-blue-700 transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brandBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">New to FinSeek?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;