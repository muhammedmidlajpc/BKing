import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formvalue, setformvalue] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [err, seterr] = useState({});
  const navigate = useNavigate();
  const [cnfrmpsswrd, setcnfrmpsswrd] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformvalue({ ...formvalue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    try {
      const errors = validate(formvalue);
      if (Object.keys(errors).length === 0) {
        console.log(formvalue);
        seterr({});
      } else {
        seterr(errors);
        console.log(errors);
        toast.error(err);
      }
      axios.post("http://localhost:5000/signup", formvalue, {
        withCredentials: true
      })
      .then((res)=>{
        console.log(res.data)
        toast.success("Registration succesfull")
        sessionStorage.setItem("userId",res.data._id)
        navigate("/dashboard")
      })
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
    } else if (value.password.length < 8) {
      errors.password = "password must contain atleast 8 characters";
    } else if (cnfrmpsswrd !== value.password) {
      errors.password = "password must be the same";
    }
    return errors;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        BOOKING SYSTEM
      </h1>
      <div className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-sm">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              className="w-full p-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
              required
              aria-required="true"
              value={formvalue.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              className="w-full p-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
              aria-required="true"
              value={formvalue.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full p-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a password (min 8 chars)"
              required
              aria-required="true"
              minLength="8"
              value={formvalue.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              className="w-full p-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
              required
              aria-required="true"
              minLength="8"
              value={cnfrmpsswrd}
              onChange={(e) => setcnfrmpsswrd(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-semibold transition-colors duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-purple-400 underline hover:text-purple-300 transition-colors duration-200"
            aria-label="Navigate to login page"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
