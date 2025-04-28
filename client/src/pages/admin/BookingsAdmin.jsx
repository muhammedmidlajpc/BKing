"use client"

import { useState, useEffect } from "react"
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const BookingsAdmin = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])

  useEffect(() => {
    // Fetch all bookings data
    // This would be replaced with actual API calls
    const fetchBookings = () => {
      // Mock data
      const mockBookings = [
        {
          id: 1,
          title: "Consultation Call",
          date: "2025-05-01",
          time: "10:00 AM",
          status: "confirmed",
          notes: "Initial consultation to discuss project requirements.",
          user: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
          },
        },
        {
          id: 2,
          title: "Follow-up Meeting",
          date: "2025-05-03",
          time: "2:30 PM",
          status: "confirmed",
          notes: "Review progress and discuss next steps.",
          user: {
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1 (555) 987-6543",
          },
        },
        {
          id: 3,
          title: "Project Discussion",
          date: "2025-05-10",
          time: "11:00 AM",
          status: "pending",
          notes: "Detailed discussion about project timeline and deliverables.",
          user: {
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+1 (555) 456-7890",
          },
        },
        {
          id: 4,
          title: "Initial Assessment",
          date: "2025-04-15",
          time: "9:00 AM",
          status: "completed",
          notes: "Completed initial assessment successfully.",
          user: {
            name: "Sarah Williams",
            email: "sarah@example.com",
            phone: "+1 (555) 234-5678",
          },
        },
        {
          id: 5,
          title: "Strategy Session",
          date: "2025-04-10",
          time: "3:00 PM",
          status: "completed",
          notes: "Discussed strategy and set goals for the project.",
          user: {
            name: "Alex Brown",
            email: "alex@example.com",
            phone: "+1 (555) 876-5432",
          },
        },
        {
          id: 6,
          title: "Technical Review",
          date: "2025-04-20",
          time: "1:00 PM",
          status: "cancelled",
          notes: "Cancelled due to scheduling conflict.",
          user: {
            name: "Emily Davis",
            email: "emily@example.com",
            phone: "+1 (555) 345-6789",
          },
        },
      ]

      setBookings(mockBookings)
      setFilteredBookings(mockBookings)
    }

    fetchBookings()
  }, [])

  useEffect(() => {
    // Filter bookings based on tab, search term, and filter status
    let filtered = [...bookings]

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((booking) => {
        if (activeTab === "upcoming") {
          return booking.status === "confirmed" || booking.status === "pending"
        } else if (activeTab === "completed") {
          return booking.status === "completed"
        } else if (activeTab === "cancelled") {
          return booking.status === "cancelled"
        }
        return true
      })
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((booking) => booking.status === filterStatus)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (booking) =>
          booking.title.toLowerCase().includes(term) ||
          booking.user.name.toLowerCase().includes(term) ||
          booking.user.email.toLowerCase().includes(term),
      )
    }

    setFilteredBookings(filtered)
  }, [activeTab, searchTerm, filterStatus, bookings])

  const handleUpdateStatus = (bookingId, newStatus) => {
    // Here you would call your API to update the booking status
    // For now, we'll just update the local state

    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return { ...booking, status: newStatus }
      }
      return booking
    })

    setBookings(updatedBookings)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="mt-2 text-gray-600">View and manage all bookings across the system.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Bookings
            </button>
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
              onClick={() => setActiveTab("completed")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "completed"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Completed
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

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search bookings or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No bookings match your search criteria.</div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">{booking.title}</h3>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Details</h4>
                      <div className="flex items-center mb-2">
                        <CalendarDays className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{booking.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{booking.time}</span>
                      </div>
                      <p className="text-gray-600">{booking.notes}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">User Information</h4>
                      <div className="flex items-center mb-2">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{booking.user.name}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{booking.user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{booking.user.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end space-x-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                          className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 mb-2 sm:mb-0"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                          className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 mb-2 sm:mb-0"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "completed")}
                          className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 mb-2 sm:mb-0"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                          className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 mb-2 sm:mb-0"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredBookings.length}</span> of{" "}
                <span className="font-medium">{filteredBookings.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingsAdmin
