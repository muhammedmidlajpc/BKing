
import { useState, useEffect } from "react"
import { CalendarDays, Clock, Edit, Trash2 } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Booking = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  })

  useEffect(() => {
    // Fetch user bookings data
    // This would be replaced with actual API calls
    const fetchBookings = () => {
      // Mock data
      const mockUpcomingBookings = [
        {
          id: 1,
          title: "Consultation Call",
          date: "2025-05-01",
          time: "10:00 AM",
          status: "confirmed",
          notes: "Initial consultation to discuss project requirements.",
        },
        {
          id: 2,
          title: "Follow-up Meeting",
          date: "2025-05-03",
          time: "2:30 PM",
          status: "confirmed",
          notes: "Review progress and discuss next steps.",
        },
        {
          id: 3,
          title: "Project Discussion",
          date: "2025-05-10",
          time: "11:00 AM",
          status: "pending",
          notes: "Detailed discussion about project timeline and deliverables.",
        },
      ]

      const mockPastBookings = [
        {
          id: 4,
          title: "Initial Assessment",
          date: "2025-04-15",
          time: "9:00 AM",
          status: "completed",
          notes: "Completed initial assessment successfully.",
        },
        {
          id: 5,
          title: "Strategy Session",
          date: "2025-04-10",
          time: "3:00 PM",
          status: "completed",
          notes: "Discussed strategy and set goals for the project.",
        },
      ]

      const mockCancelledBookings = [
        {
          id: 6,
          title: "Technical Review",
          date: "2025-04-20",
          time: "1:00 PM",
          status: "cancelled",
          notes: "Cancelled due to scheduling conflict.",
        },
      ]

      setBookings({
        upcoming: mockUpcomingBookings,
        past: mockPastBookings,
        cancelled: mockCancelledBookings,
      })
    }

    fetchBookings()
  }, [])

  const handleCancelBooking = (bookingId) => {
    // Here you would call your API to cancel the booking
    // For now, we'll just update the local state

    const bookingToCancel = bookings.upcoming.find((booking) => booking.id === bookingId)

    if (bookingToCancel) {
      bookingToCancel.status = "cancelled"

      setBookings({
        upcoming: bookings.upcoming.filter((booking) => booking.id !== bookingId),
        past: bookings.past,
        cancelled: [...bookings.cancelled, bookingToCancel],
      })
    }
  }

  const renderBookingsList = (bookingsList) => {
    if (bookingsList.length === 0) {
      return <div className="text-center py-8 text-gray-500">No bookings to display.</div>
    }

    return (
      <div className="space-y-4">
        {bookingsList.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{booking.title}</h3>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center mb-4">
                <CalendarDays className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">{booking.date}</span>
                <Clock className="h-5 w-5 text-gray-400 ml-4 mr-2" />
                <span className="text-gray-700">{booking.time}</span>
              </div>
              <p className="text-gray-600 mb-4">{booking.notes}</p>

              {booking.status === "confirmed" || booking.status === "pending" ? (
                <div className="flex justify-end space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Edit className="h-4 w-4 mr-2" />
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">View and manage all your bookings.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "past"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "cancelled"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Cancelled
            </button>
          </nav>
        </div>

        {/* Bookings List */}
        {activeTab === "upcoming" && renderBookingsList(bookings.upcoming)}
        {activeTab === "past" && renderBookingsList(bookings.past)}
        {activeTab === "cancelled" && renderBookingsList(bookings.cancelled)}
      </div>
      <Footer/>
    </div>
  )
}

export default Booking
