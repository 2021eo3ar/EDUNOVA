import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-50 p-4">
      <ul className="space-y-4">
        <li
          className={`flex items-center space-x-3 font-semibold ${
            location.pathname === "/" ? "text-purple-600" : "text-black "
          }`}
        >
          <FontAwesomeIcon
            icon={faThLarge}
            className={`${
              location.pathname === "/"
                ? "bg-purple-600 text-white rounded-md border-2 border-purple-600 p-2"
                : "text-white bg-black border-2 rounded-md p-2"
            }`}
          />
          <Link to="/" className="font-bold text-sm">
            Overview
          </Link>
        </li>
        <li
          className={`flex items-center space-x-3 font-semibold ${
            location.pathname === "/people_directory"
              ? "text-purple-600"
              : "text-black"
          }`}
        >
          <FontAwesomeIcon
            icon={faThLarge}
            className={`${
              location.pathname === "/people_directory"
                ? "bg-purple-600 text-white rounded-md border-2 border-purple-600 p-2"
                : "text-white bg-black border-2 rounded-md p-2"
            }`}
          />
          <Link to="/people_directory" className="font-bold text-sm">
            People Directory
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
