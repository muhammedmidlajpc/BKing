import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [formvalue, setformvalue] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [err, seterr] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("sign in with:", formvalue);
      const errors = validate(formvalue);
      if (Object.keys(errors).length === 0) {
        console.log(formvalue);
        seterr({});
      } else {
        seterr({ errors });
        toast.error(err);
      }
      axios
        .post("http://localhost:5000/signin", formvalue, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res);
          toast.success("welcome");
          sessionStorage.setItem("userId", res.data.data._id);
          sessionStorage.setItem("role", res.data.data.role);
          const role = sessionStorage.getItem("role");
          if (role === "admin") {
            navigate("/calendaradmin");
          } else {
            navigate("/calendar");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const validate = (value) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.email) {
      errors.email = "this feild can't be empty";
    } else if (!emailRegex.test(value.email)) {
      errors.email = "enter a valid email";
    } else if (!value.password) {
      errors.password = "this feild can't be empty";
    } else if (value.password < 8) {
      errors.password = "password must contain atleast 8 characters";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformvalue({ ...formvalue, [name]: value });
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
              value={formvalue.email}
              onChange={handleChange}
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
              value={formvalue.password}
              onChange={handleChange}
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
          Don't have an account?
          <Link
            to={"/signup"}
            className="text-purple-400 underline hover:text-purple-300 transition-colors duration-200"
            aria-label="Navigate to sign up page"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
