"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const passwordRules = [
  { id: "length", label: "At least 6 characters", test: (p) => p.length >= 6 },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    test: (p) => /[a-z]/.test(p),
  },
];



const RegisterPage = () => {
  const router = useRouter();
  useEffect(() => {
    document.title = "StudyNook – Register";
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allRulesPassed = passwordRules.every((rule) =>
    rule.test(form.password),
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordTouched(true);

    if (!allRulesPassed) {
      toast.error("Please fix the password errors before submitting.");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoURL,
      });

      if (error) {
        console.error(error.message);
        toast.error(error.message || "Registration Failed");
        return;
      }

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      router.push("/");
    } catch (err) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-gray-400 mt-1.5">
            Join StudyNook and start booking study rooms
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-4">
          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Profile Image URL
              </label>
              <input
                type="url"
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div
                className={`flex items-center border rounded-xl px-4 transition-colors bg-white ${
                  passwordTouched && !allRulesPassed
                    ? "border-red-400"
                    : "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordTouched(true)}
                  placeholder="Min. 6 chars, 1 uppercase, 1 lowercase"
                  required
                  className="flex-1 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-2 shrink-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>


            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold no-underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;