import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";

// BrightNest-styled Signup Page

export default function SignInPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signinHandler } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await signinHandler({ name, email, password });
    } catch (err) {
      console.error(err);
      setMessage(err?.message || "Signup failed. Try again.");
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left gradient panel */}
        <div
          className="hidden md:flex md:flex-1 items-end p-8"
          style={{
            background: "radial-gradient(circle at 60% 55%, rgba(255,150,90,0.95) 0%, rgba(255,130,70,0.6) 25%, rgba(255,180,150,0.35) 55%, rgba(245,210,200,0.25) 75%, rgba(240,225,220,0.25) 100%)",
          }}
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/80"></div>
                <span className="font-semibold text-black/80">BrightNest</span>
              </div>
            </div>

            <div className="pb-6">
              <p className="text-sm text-black/70 mb-2">You can easily</p>
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                Create your personal hub for clarity and productivity.
              </h2>
            </div>
          </div>
        </div>

        {/* Right auth panel */}
        <div className="flex-1 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <div className="text-orange-400 text-2xl">*</div>
              <h1 className="text-3xl font-bold mt-2">Create Account</h1>
              <p className="text-sm text-gray-400 mt-2">Start your journey with BrightNest.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <label className="block text-sm">
                <div className="text-sm text-gray-600 mb-2">Full Name</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </label>

              <label className="block text-sm">
                <div className="text-sm text-gray-600 mb-2">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </label>

              <label className="block text-sm">
                <div className="text-sm text-gray-600 mb-2">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md mt-2 shadow-[0_18px_30px_rgba(0,0,0,0.12)]"
              >
                Sign up
              </button>

              {message && <p className="text-sm text-red-500 mt-2">{message}</p>}

              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account? <Link to="/login" className="text-orange-400">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
