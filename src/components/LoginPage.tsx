"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { FiUser, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { Button } from "@/components/ui";
import { LoginCredentials } from "@/types";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Formik setup
  const formik = useFormik<LoginCredentials>({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setLoginError("");

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock authentication - in real app, this would be an API call
        if (values.username === "admin" && values.password === "password") {
          // Store auth token (in real app)
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: "1",
              username: values.username,
              email: "admin@ids-ai.com",
              role: "admin",
              firstName: "System",
              lastName: "Administrator",
            })
          );

          router.push("/dashboard");
        } else {
          setLoginError("Invalid username or password");
        }
      } catch {
        setLoginError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="cyber-grid"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>

      {/* Login Container */}
      <div className="relative max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FiShield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">IDS-AI</h1>
          <p className="text-blue-200 text-lg">
            Intelligent Intrusion Detection System
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Secure your network with AI-powered protection
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-300">Sign in to your security dashboard</p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">{loginError}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className={`
                    block w-full pl-10 pr-3 py-3 border rounded-lg 
                    bg-white/10 backdrop-blur-sm text-white placeholder-slate-400
                    border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400
                    transition-colors duration-200
                    ${
                      formik.touched.username && formik.errors.username
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : ""
                    }
                  `}
                  placeholder="Enter your username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="mt-1 text-sm text-red-400">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-lg 
                    bg-white/10 backdrop-blur-sm text-white placeholder-slate-400
                    border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400
                    transition-colors duration-200
                    ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : ""
                    }
                  `}
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                  ) : (
                    <FiEye className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white/10"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-slate-200"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
              disabled={!formik.isValid}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-400/30">
            <p className="text-blue-200 text-sm font-medium mb-2">
              Demo Credentials:
            </p>
            <div className="text-slate-300 text-sm space-y-1">
              <p>
                <span className="font-medium">Username:</span> admin
              </p>
              <p>
                <span className="font-medium">Password:</span> password
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 IDS-AI Security System. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
