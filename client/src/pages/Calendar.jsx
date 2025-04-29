import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
const Calendar = () => {
  const [currentDate, setcurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    console.log("first");
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setcurrentDate(newDate);
  };
  const handleNextMonth = () => {
    console.log("s");
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setcurrentDate(newDate);
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  // Get the number of days in the month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // Get the first day of the month
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  //Generate Calendar Days:
  //First, generate empty cells for the days before the 1st of the month (e.g., if the month starts on a Wednesday, leave space for Sunday, Monday, and Tuesday).
  //Then, generate the days of the month and add them to the grid.

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const firstDayOfMonth = getFirstDayOfMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const days = [];
    // Add empty slots before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(""); // Empty cell for days before the first day
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day); // Add the actual days of the month
    }
    return days;
  };
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDate, setselectedDate] = useState(null);
  const handleDateClick = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setselectedDate(newDate);
  };

  const generateSlots = () => {
    const slots = [];
    let startHour = 9;
    let endHour = 17;
    let interval = 30;
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return slots;
  };
  const bookedSlots = {
    "2025-04-03": ["9:00", "9:30"],
    "2025-04-01": ["10:00"]
  };
  const [selectedSlot, setselectedSlot] = useState(null);
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const filterSlot = () => {
    if (!selectedDate) return [];
    const formattedDate = formatDate(selectedDate);
    return bookedSlots[formattedDate] || [];
  };
  const userId = sessionStorage.getItem("userId");
  const [bookingPurpose, setbookingPurpose] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formvalue = {
      userId: userId,
      date: selectedDate,
      time: selectedSlot,
      purpose: bookingPurpose
    };
    console.log(formvalue)
    try {
      axios
        .post("http://localhost:5000/booking", formvalue)
        .then((res) => {
          console.log(res.data);
          setselectedDate(null);
          setselectedSlot(null);
          setbookingPurpose("");
          toast.success("Slot send for Booking");
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header component */}
      <Header />

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and instructions */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Book an Appointment
          </h1>
          <p className="mt-2 text-zinc-400">
            Select a date and time slot to schedule your appointment.
          </p>
        </div>

        {/* Layout with calendar on the left and booking form on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-lg shadow overflow-hidden">
            {/* Calendar navigation (previous and next month buttons) */}
            <div className="p-4 flex items-center justify-between border-b border-zinc-800">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-zinc-400" />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </button>
            </div>

            {/* Calendar grid displaying the days of the week */}
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map((day, idx) => {
                  return (
                    <div
                      key={idx}
                      className="text-center text-sm font-medium text-zinc-400 "
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Days of the month */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {/* We call generateCalendarDays() here instead of using a plain array,
                    because it dynamically calculates:
                      1. Blank days before the 1st of the month (for correct alignment)
                      2. Actual number of days in the selected month
                    This keeps the calendar accurate every time the month changes */}
                {generateCalendarDays().map((day, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (day !== "") handleDateClick(day);
                      }}
                      className={`h-12 flex items-center justify-center rounded-md text-sm text-zinc-700 ${
                        day &&
                        selectedDate &&
                        day === selectedDate.getDate() &&
                        currentDate.getMonth() === selectedDate.getMonth() &&
                        currentDate.getFullYear() === selectedDate.getFullYear()
                          ? "bg-purple-500 font-bold text-white"
                          : ""
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Form Section */}
          {selectedDate && (
            <div className="bg-zinc-900 rounded-lg shadow overflow-hidden">
              {/* Booking section header */}
              {/* {console.log(selectedDate)} */}
              <div className="p-4 border-b border-zinc-800">
                <h3 className="text-lg font-medium text-white">
                  Available Times
                </h3>
              </div>

              {/* Booking slots or date selection prompt */}
              <div className="p-4">
                {/* <div className="text-center py-8 text-zinc-400">
                  Please select a date from the calendar to see available time
                  slots.
                </div> */}

                {/* Booking time slots */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {generateSlots().map((slot, idx) => {
                    return (
                      <button
                        key={idx}
                        disabled={filterSlot().includes(slot)}
                        className={`flex items-center justify-center py-2 px-4 border rounded-md border-zinc-700
                          ${
                            filterSlot().includes(slot)
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : selectedSlot === slot
                              ? "bg-green-400 text-white"
                              : "bg-zinc-800 text-white hover:bg-zinc-700"
                          }
                        `}
                        onClick={() => {
                          if (!filterSlot().includes(slot)) {
                            setselectedSlot(
                              selectedSlot === slot ? null : slot
                            );
                          }
                        }}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {/* Booking details form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="purpose"
                      className="block text-sm font-medium text-zinc-300 mb-1"
                    >
                      Purpose of Booking
                    </label>
                    <textarea
                      id="purpose"
                      rows="3"
                      className="w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Briefly describe the purpose of your booking..."
                      value={bookingPurpose}
                      onChange={(e) => setbookingPurpose(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Calendar;
