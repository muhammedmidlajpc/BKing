import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const role = sessionStorage.getItem("role");
  const getRoute = (path) => {
    return role === "admin" ? `${path}admin` : `${path}`;
  };
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link
          to={getRoute("/calendar")}
          className="text-2xl font-bold text-purple-400"
        >
          Booking System
        </Link>
        <nav className="space-x-6">
          <Link to={getRoute("/dashboard")} className="hover:text-purple-400">
            Dashboard
          </Link>
          <Link to={getRoute("/calendar")} className="hover:text-purple-400">
            Calendar
          </Link>
          <Link to={getRoute("/booking")} className="hover:text-purple-400">
            Booking
          </Link>
          <Link to={getRoute("/profile")} className="hover:text-purple-400">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
