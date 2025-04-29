import { useState, useEffect } from "react"
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Dashboard
 = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  })

  useEffect(() => {
    // Fetch user bookings data
    // This would be replaced with actual API calls
    const fetchBookings = () => {
      // Mock data
      const mockUpcomingBookings = [
        { id: 1, title: "Consultation Call", date: "2025-05-01", time: "10:00 AM", status: "confirmed" },
        { id: 2, title: "Follow-up Meeting", date: "2025-05-03", time: "2:30 PM", status: "confirmed" },
        { id: 3, title: "Project Discussion", date: "2025-05-10", time: "11:00 AM", status: "pending" },
      ]

      const mockStats = {
        totalBookings: 12,
        completedBookings: 8,
        cancelledBookings: 1,
      }

      setUpcomingBookings(mockUpcomingBookings)
      setStats(mockStats)
    }

    fetchBookings()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-400">User Dashboard</h1>
          <p className="mt-2 text-zinc-400">Welcome back! Here's an overview of your bookings.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-900 text-purple-400">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Total Bookings</p>
                <p className="text-2xl font-semibold text-white">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-900 text-green-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Completed</p>
                <p className="text-2xl font-semibold text-white">{stats.completedBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-900 text-red-400">
                <XCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Cancelled</p>
                <p className="text-2xl font-semibold text-white">{stats.cancelledBookings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-zinc-900 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-800">
            <h3 className="text-lg font-medium text-white">Upcoming Bookings</h3>
          </div>
          <ul className="divide-y divide-zinc-800">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <li key={booking.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{booking.title}</p>
                      <div className="flex items-center mt-2">
                        <CalendarDays className="h-4 w-4 text-zinc-500 mr-1" />
                        <p className="text-sm text-zinc-400 mr-4">{booking.date}</p>
                        <Clock className="h-4 w-4 text-zinc-500 mr-1" />
                        <p className="text-sm text-zinc-400">{booking.time}</p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-900 text-green-400"
                            : "bg-yellow-900 text-yellow-400"
                        }`}
                      >
                        {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-6 py-4 text-center text-zinc-400">No upcoming bookings</li>
            )}
          </ul>
          <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900">
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
              Book New Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard

