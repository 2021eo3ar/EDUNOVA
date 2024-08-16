import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'

const DashBoard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard Content */}
        <div className="flex-1 p-6 bg-gray-100" >
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
