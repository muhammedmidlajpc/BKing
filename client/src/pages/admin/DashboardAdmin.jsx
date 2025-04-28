
import { useState, useEffect } from "react"
import { CalendarDays, Users, TrendingUp, AlertCircle, User } from "lucide-react"

const DashboardAdmin = () => {
  const [recentBookings, setRecentBookings] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeUsers: 0,
    pendingBookings: 0,
    todayBookings: 0,
  })

  useEffect(() => {
    // Fetch admin dashboard data
    // This would be replaced with actual API calls
    const fetchDashboardData = () => {
      // Mock data
      const mockRecentBookings = [
        {
          id: 1,
          user: "John Doe",
          title: "Consultation Call",
          date: "2025-05-01",
          time: "10:00 AM",
          status: "confirmed",
        },
        {
          id: 2,
          user: "Jane Smith",
          title: "Follow-up Meeting",
          date: "2025-05-03",
          time: "2:30 PM",
          status: "confirmed",
        },
        {
          id: 3,
          user: "Mike Johnson",
          title: "Project Discussion",
          date: "2025-05-10",
          time: "11:00 AM",
          status: "pending",
        },
        {
          id: 4,
          user: "Sarah Williams",
          title: "Initial Assessment",
          date: "2025-05-12",
          time: "9:00 AM",
          status: "pending",
        },
        {
          id: 5,
          user: "Alex Brown",
          title: "Strategy Session",
          date: "2025-05-15",
          time: "3:00 PM",
          status: "confirmed",
        },
      ]

      const mockStats = {
        totalBookings: 145,
        activeUsers: 37,
        pendingBookings: 12,
        todayBookings: 8,
      }

      setRecentBookings(mockRecentBookings)
      setStats(mockStats)
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-400">Admin Dashboard</h1>
          <p className="mt-2 text-zinc-400">Monitor and manage all bookings and users.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="p-3 rounded-full bg-blue-900 text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Active Users</p>
                <p className="text-2xl font-semibold text-white">{stats.activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-900 text-yellow-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Pending Bookings</p>
                <p className="text-2xl font-semibold text-white">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-900 text-green-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Today's Bookings</p>
                <p className="text-2xl font-semibold text-white">{stats.todayBookings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-zinc-900 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Recent Bookings</h3>
            <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead className="bg-zinc-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Booking Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-zinc-800 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{booking.user}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{booking.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{booking.date}</div>
                      <div className="text-sm text-zinc-400">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-900 text-green-400"
                            : "bg-yellow-900 text-yellow-400"
                        }`}
                      >
                        {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      <button className="text-purple-400 hover:text-purple-300 mr-3 transition-colors duration-200">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors duration-200">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900 flex justify-between">
            <button className="py-2 px-4 border border-zinc-700 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
              Previous
            </button>
            <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
