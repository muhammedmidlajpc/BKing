
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingPurpose, setBookingPurpose] = useState("");

  // Generate days for the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push({
        day: i,
        date,
        isCurrentMonth: true,
        isToday,
        hasAvailableSlots: Math.random() > 0.3 // Randomly determine if day has available slots
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
  };

  const handleDateClick = (day) => {
    if (!day.isCurrentMonth || !day.hasAvailableSlots) return;

    setSelectedDate(day.date);

    // Generate mock available time slots for the selected date
    const mockTimeSlots = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      if (Math.random() > 0.3) {
        // Randomly make some slots available
        mockTimeSlots.push({
          id: `slot-${hour}`,
          time: `${hour}:00`,
          available: true
        });
      }

      if (hour < endHour - 1 && Math.random() > 0.3) {
        mockTimeSlots.push({
          id: `slot-${hour}-30`,
          time: `${hour}:30`,
          available: true
        });
      }
    }

    setAvailableSlots(mockTimeSlots);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Here you would submit the booking to your backend
    alert(
      `Booking submitted for ${selectedDate.toDateString()} at ${
        selectedSlot.time
      } for: ${bookingPurpose}`
    );

    // Reset form
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
    setBookingPurpose("");
  };

  const days = generateCalendarDays();
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
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Book an Appointment
          </h1>
          <p className="mt-2 text-zinc-400">
            Select a date and time slot to schedule your appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-lg shadow overflow-hidden">
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

            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-sm font-medium text-zinc-400"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      h-12 flex items-center justify-center rounded-md text-sm
                      ${!day.isCurrentMonth ? "text-zinc-700" : ""}
                      ${
                        day.isToday
                          ? "bg-purple-900 text-purple-300 font-semibold"
                          : ""
                      }
                      ${
                        day.isCurrentMonth && !day.isToday
                          ? "text-zinc-300"
                          : ""
                      }
                      ${
                        day.isCurrentMonth && day.hasAvailableSlots
                          ? "cursor-pointer hover:bg-zinc-800 transition-colors duration-200"
                          : ""
                      }
                      ${
                        day.isCurrentMonth && !day.hasAvailableSlots
                          ? "text-zinc-600"
                          : ""
                      }
                      ${
                        selectedDate &&
                        day.date &&
                        selectedDate.toDateString() === day.date.toDateString()
                          ? "bg-purple-500 text-white"
                          : ""
                      }
                    `}
                    onClick={() =>
                      day.isCurrentMonth && day.hasAvailableSlots
                        ? handleDateClick(day)
                        : null
                    }
                  >
                    {day.day}
                    {day.isCurrentMonth && day.hasAvailableSlots && (
                      <span className="w-1 h-1 bg-green-400 rounded-full absolute bottom-1"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-zinc-900 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h3 className="text-lg font-medium text-white">
                {selectedDate
                  ? `Available Times for ${selectedDate.toDateString()}`
                  : "Select a Date"}
              </h3>
            </div>

            <div className="p-4">
              {!selectedDate && (
                <div className="text-center py-8 text-zinc-400">
                  Please select a date from the calendar to see available time
                  slots.
                </div>
              )}

              {selectedDate && availableSlots.length === 0 && (
                <div className="text-center py-8 text-zinc-400">
                  No available time slots for the selected date.
                </div>
              )}

              {selectedDate && availableSlots.length > 0 && (
                <div>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        className={`
                          flex items-center justify-center py-2 px-4 border rounded-md transition-colors duration-200
                          ${
                            selectedSlot && selectedSlot.id === slot.id
                              ? "bg-purple-500 text-white border-purple-500"
                              : "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
                          }
                        `}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot.time}
                      </button>
                    ))}
                  </div>

                  {selectedSlot && (
                    <form onSubmit={handleBookingSubmit}>
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
                          onChange={(e) => setBookingPurpose(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                      >
                        Confirm Booking
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
