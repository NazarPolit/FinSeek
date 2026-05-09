import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Props = {};

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });
  
  const handleRegister = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-center pt-8 pb-28 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Join FinSeek to start your financial analysis
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-100 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`appearance-none block w-full px-4 py-2.5 border ${
                    errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-slate-300 focus:ring-brandBlue focus:border-brandBlue"
                  } rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
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

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brandBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;