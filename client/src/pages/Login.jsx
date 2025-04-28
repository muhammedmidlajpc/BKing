import React from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        BOOKING SYSTEM
      </h1>
      <div className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-sm">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="username"
              className="w-full p-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full p-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
              aria-required="true"
              minLength="8"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-semibold transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-zinc-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-400 underline hover:text-purple-300 transition-colors duration-200"
            aria-label="Navigate to sign up page"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;