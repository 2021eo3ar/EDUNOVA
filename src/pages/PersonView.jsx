import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TeamTable from '../components/Table';

const PeopleView = () => {
  return (
    <div className="h-screen flex flex-col">
    {/* Navbar */}
    <Navbar />

    <div className="flex flex-1">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-200 border-2 border-gray-300 rounded-md m-6 w-4/5" >
        <TeamTable />
      </div>
    </div>
  </div>
  );
};

export default PeopleView;
