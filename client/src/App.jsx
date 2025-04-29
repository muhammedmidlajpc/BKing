import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/Sign up";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Booking from "./pages/Booking";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import CalendarAdmin from "./pages/admin/CalendarAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProfileAdmin from "./pages/admin/ProfileAdmin";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingadmin" element={<BookingsAdmin />} />
        <Route path="/calendaradmin" element={<CalendarAdmin />} />
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/profileadmin" element={<ProfileAdmin />} />
      </Routes>
    </div>
  );
};

export default App;
