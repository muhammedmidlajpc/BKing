import { useState } from "react"
import { User, Mail, Phone, Lock, Save, Settings, Users } from "lucide-react"

const ProfileAdmin = () => {
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1 (555) 987-6543",
    role: "Administrator",
    profileImage: null,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [systemSettings, setSystemSettings] = useState({
    maxBookingsPerDay: 20,
    minTimeSlotDuration: 30,
    allowCancellationHours: 24,
    autoConfirmBookings: false,
    workingHoursStart: "09:00",
    workingHoursEnd: "17:00",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "workingDays") {
      const updatedDays = [...systemSettings.workingDays]

      if (checked) {
        updatedDays.push(value)
      } else {
        const index = updatedDays.indexOf(value)
        if (index > -1) {
          updatedDays.splice(index, 1)
        }
      }

      setSystemSettings({
        ...systemSettings,
        workingDays: updatedDays,
      })
    } else {
      setSystemSettings({
        ...systemSettings,
        [name]: type === "checkbox" ? checked : value,
      })
    }
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser({
          ...user,
          profileImage: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })
    }
    setIsEditing(!isEditing)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    // Here you would call your API to update the password
    alert("Password updated successfully!")

    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleSaveSettings = () => {
    // Here you would call your API to update system settings
    alert("System settings updated successfully!")
  }

  const weekdays = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account and system settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <button
                  onClick={handleEditToggle}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isEditing
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 inline mr-1" />
                      Save
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </button>
              </div>
              <div className="px-6 py-5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Change Photo
                        <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                      </label>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        {isEditing ? (
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-gray-900">{user.name}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        {isEditing ? (
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-gray-900">{user.email}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-gray-900">{user.phone}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-900">{user.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
              </div>
              <div className="px-6 py-5">
                <form onSubmit={handlePasswordChange}>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
              </div>
              <div className="px-6 py-5">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="maxBookingsPerDay" className="block text-sm font-medium text-gray-700 mb-1">
                      Max Bookings Per Day
                    </label>
                    <input
                      type="number"
                      name="maxBookingsPerDay"
                      id="maxBookingsPerDay"
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={systemSettings.maxBookingsPerDay}
                      onChange={handleSettingsChange}
                      min="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="minTimeSlotDuration" className="block text-sm font-medium text-gray-700 mb-1">
                      Min Time Slot Duration (minutes)
                    </label>
                    <select
                      id="minTimeSlotDuration"
                      name="minTimeSlotDuration"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                      value={systemSettings.minTimeSlotDuration}
                      onChange={handleSettingsChange}
                    >
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="60">60</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="allowCancellationHours" className="block text-sm font-medium text-gray-700 mb-1">
                      Allow Cancellation (hours before)
                    </label>
                    <input
                      type="number"
                      name="allowCancellationHours"
                      id="allowCancellationHours"
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={systemSettings.allowCancellationHours}
                      onChange={handleSettingsChange}
                      min="0"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="autoConfirmBookings" className="text-sm font-medium text-gray-700">
                        Auto-Confirm Bookings
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          name="autoConfirmBookings"
                          id="autoConfirmBookings"
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          checked={systemSettings.autoConfirmBookings}
                          onChange={handleSettingsChange}
                        />
                        <label
                          htmlFor="autoConfirmBookings"
                          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                            systemSettings.autoConfirmBookings ? "bg-purple-500" : "bg-gray-300"
                          }`}
                        ></label>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Automatically confirm new bookings without admin approval.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="workingHoursStart" className="block text-sm font-medium text-gray-700 mb-1">
                        Working Hours Start
                      </label>
                      <input
                        type="time"
                        name="workingHoursStart"
                        id="workingHoursStart"
                        className="focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={systemSettings.workingHoursStart}
                        onChange={handleSettingsChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="workingHoursEnd" className="block text-sm font-medium text-gray-700 mb-1">
                        Working Hours End
                      </label>
                      <input
                        type="time"
                        name="workingHoursEnd"
                        id="workingHoursEnd"
                        className="focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={systemSettings.workingHoursEnd}
                        onChange={handleSettingsChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                    <div className="space-y-2">
                      {weekdays.map((day) => (
                        <div key={day.value} className="flex items-center">
                          <input
                            id={day.value}
                            name="workingDays"
                            value={day.value}
                            type="checkbox"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            checked={systemSettings.workingDays.includes(day.value)}
                            onChange={handleSettingsChange}
                          />
                          <label htmlFor={day.value} className="ml-2 block text-sm text-gray-700">
                            {day.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleSaveSettings}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for toggle switch */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #8B5CF6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #8B5CF6;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>
  )
}

export default ProfileAdmin
