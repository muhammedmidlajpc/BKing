
import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Plus, Edit, Trash2, User } from "lucide-react"

const CalendarAdmin = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [timeSlots, setTimeSlots] = useState([])
  const [isAddingSlot, setIsAddingSlot] = useState(false)
  const [newSlotTime, setNewSlotTime] = useState("")
  const [newSlotDuration, setNewSlotDuration] = useState("30")
  const [bookings, setBookings] = useState([])

  // Generate days for the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", isCurrentMonth: false })
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isToday = date.toDateString() === new Date().toDateString()

      days.push({
        day: i,
        date,
        isCurrentMonth: true,
        isToday,
        hasBookings: Math.random() > 0.5, // Randomly determine if day has bookings
      })
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
    setTimeSlots([])
    setBookings([])
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
    setTimeSlots([])
    setBookings([])
  }

  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return

    setSelectedDate(day.date)

    // Generate mock time slots for the selected date
    const mockTimeSlots = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour < endHour; hour++) {
      mockTimeSlots.push({
        id: `slot-${hour}`,
        time: `${hour}:00`,
        booked: Math.random() > 0.7, // Randomly determine if slot is booked
      })

      if (hour < endHour - 1) {
        mockTimeSlots.push({
          id: `slot-${hour}-30`,
          time: `${hour}:30`,
          booked: Math.random() > 0.7,
        })
      }
    }

    setTimeSlots(mockTimeSlots)

    // Generate mock bookings for the selected date
    const mockBookings = []
    mockTimeSlots.forEach((slot) => {
      if (slot.booked) {
        mockBookings.push({
          id: `booking-${slot.id}`,
          slotId: slot.id,
          time: slot.time,
          user: {
            name: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Alex Brown"][
              Math.floor(Math.random() * 5)
            ],
            email: "user@example.com",
          },
          purpose: ["Consultation", "Follow-up", "Initial Meeting", "Project Discussion", "Review Session"][
            Math.floor(Math.random() * 5)
          ],
        })
      }
    })

    setBookings(mockBookings)
  }

  const handleAddSlot = () => {
    setIsAddingSlot(true)
  }

  const handleCancelAddSlot = () => {
    setIsAddingSlot(false)
    setNewSlotTime("")
    setNewSlotDuration("30")
  }

  const handleSaveSlot = () => {
    if (!newSlotTime) return

    const newSlot = {
      id: `slot-new-${Date.now()}`,
      time: newSlotTime,
      booked: false,
    }

    setTimeSlots([...timeSlots, newSlot])
    setIsAddingSlot(false)
    setNewSlotTime("")
    setNewSlotDuration("30")
  }

  const handleDeleteSlot = (slotId) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== slotId))
    setBookings(bookings.filter((booking) => booking.slotId !== slotId))
  }

  const days = generateCalendarDays()
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
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-400">Calendar Management</h1>
          <p className="mt-2 text-zinc-400">Manage time slots and view bookings.</p>
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
                  <div key={index} className="text-center text-sm font-medium text-zinc-400">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      h-12 flex items-center justify-center rounded-md text-sm relative
                      ${!day.isCurrentMonth ? "text-zinc-700" : ""}
                      ${day.isToday ? "bg-purple-900 text-purple-300 font-semibold" : ""}
                      ${day.isCurrentMonth && !day.isToday ? "text-zinc-300" : ""}
                      ${day.isCurrentMonth ? "cursor-pointer hover:bg-zinc-800 transition-colors duration-200" : ""}
                      ${selectedDate && day.date && selectedDate.toDateString() === day.date.toDateString() ? "bg-purple-500 text-white" : ""}
                    `}
                    onClick={() => (day.isCurrentMonth ? handleDateClick(day) : null)}
                  >
                    {day.day}
                    {day.isCurrentMonth && day.hasBookings && (
                      <span className="w-1 h-1 bg-purple-400 rounded-full absolute bottom-1"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots and Bookings */}
          <div className="bg-zinc-900 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                {selectedDate ? `Manage ${selectedDate.toDateString()}` : "Select a Date"}
              </h3>
              {selectedDate && (
                <button
                  onClick={handleAddSlot}
                  className="p-2 rounded-full bg-purple-900 text-purple-400 hover:bg-purple-800 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="p-4">
              {!selectedDate && (
                <div className="text-center py-8 text-zinc-400">
                  Please select a date from the calendar to manage time slots and view bookings.
                </div>
              )}

              {selectedDate && (
                <div>
                  {isAddingSlot && (
                    <div className="mb-6 p-4 border rounded-md bg-zinc-800 border-zinc-700">
                      <h4 className="text-sm font-medium text-zinc-300 mb-3">Add New Time Slot</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="time" className="block text-xs font-medium text-zinc-400 mb-1">
                            Time
                          </label>
                          <input
                            type="time"
                            id="time"
                            className="w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            value={newSlotTime}
                            onChange={(e) => setNewSlotTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="duration" className="block text-xs font-medium text-zinc-400 mb-1">
                            Duration (minutes)
                          </label>
                          <select
                            id="duration"
                            className="w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            value={newSlotDuration}
                            onChange={(e) => setNewSlotDuration(e.target.value)}
                          >
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleCancelAddSlot}
                          className="px-3 py-1 border border-zinc-700 rounded-md text-sm text-white hover:bg-zinc-700 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveSlot}
                          className="px-3 py-1 border border-transparent rounded-md text-sm text-white bg-purple-500 hover:bg-purple-600 transition-colors duration-200"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  <h4 className="text-sm font-medium text-zinc-300 mb-2">Time Slots</h4>
                  {timeSlots.length === 0 ? (
                    <p className="text-sm text-zinc-400 mb-6">No time slots available for this date.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`
                            flex items-center justify-between py-2 px-4 border rounded-md
                            ${slot.booked ? "bg-zinc-800 border-zinc-700" : "bg-zinc-900 border-zinc-700"}
                          `}
                        >
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-zinc-500" />
                            <span className="text-sm text-zinc-300">{slot.time}</span>
                            {slot.booked && (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-900 text-purple-300">
                                Booked
                              </span>
                            )}
                          </div>
                          {!slot.booked && (
                            <button
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <h4 className="text-sm font-medium text-zinc-300 mb-2">Bookings</h4>
                  {bookings.length === 0 ? (
                    <p className="text-sm text-zinc-400">No bookings for this date.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-3 border rounded-md bg-zinc-800 border-zinc-700">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-zinc-500" />
                              <span className="text-sm font-medium text-white">{booking.user.name}</span>
                            </div>
                            <span className="text-sm text-zinc-400">{booking.time}</span>
                          </div>
                          <p className="text-sm text-zinc-300 mb-2">{booking.purpose}</p>
                          <div className="flex justify-end space-x-2">
                            <button className="px-2 py-1 text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">
                              <Edit className="h-3 w-3 inline mr-1" />
                              Edit
                            </button>
                            <button className="px-2 py-1 text-xs text-red-400 hover:text-red-300 transition-colors duration-200">
                              <Trash2 className="h-3 w-3 inline mr-1" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarAdmin
