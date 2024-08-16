import React from 'react';
import { FaRegBell } from "react-icons/fa";
import images from '../assets/images/images.jpeg';



const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b-2 border-gray-300 rounded-sm">
      <div className="text-purple-600 font-bold text-3xl">PEOPLE.CO</div>
      <div className="flex items-center space-x-4">
      <FaRegBell/>
        <div className="flex items-center space-x-2">
          <img
            src={images}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-800 font-medium">Jane Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
