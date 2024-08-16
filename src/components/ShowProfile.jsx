import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const ShowProfile = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div
      className="absolute top-0 right-0 bg-white shadow-lg z-50 border-2 border-gray-400 rounded-lg"
      style={{ width: "72%", height: '93%' }} // Adjust width and height here
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl  "
      >
        &times;
      </button>
      <div className="flex text-white bg-blue-950 items-center mb-6 p-8">
        <img
          src={person.avatar || 'https://via.placeholder.com/64'}
          alt={person.firstName}
          className="w-16 h-16 rounded-full border-4 border-white shadow-md"
        />
        <div className="ml-4">
          <h2 className="text-lg text-white font-semibold">
            {person.firstName} {person.lastName}
          </h2>
          <p className="text-sm text-white">
            @{person.firstName.toLowerCase()} | {person.role}
          </p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h1 className="text-sm font-semibold bg-gray-200 p-3 text-left rounded-md text-gray-600 mb-2">
          Personal Information
        </h1>
        <div className="grid grid-cols-2 gap-2  text-sm text-gray-700">
          <div>
            <strong>Date of Birth:</strong>
          </div>
          <div>{person.dateOfBirth}</div>

          <div>
            <strong>Gender:</strong>
          </div>
          <div>{person.gender}</div>

          <div>
            <strong>Nationality:</strong>
          </div>
          <div>{person.nationality}</div>

          <div>
            <strong>Contact no.:</strong>
          </div>
          <div>{person.contactNo}</div>

          <div>
            <strong>E-mail Address:</strong>
          </div>
          <div>{person.email}</div>

          <div>
            <strong>Work Email Address:</strong>
          </div>
          <div>{person.email}</div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2 p-2">
          Research & Publication
        </h3>
        <p className="text-sm text-black text-left p-2 font-semibold mb-2">AI AND PUBLICATION DESIGN: IOT INVENTIONS</p>
        <p className="text-sm text-black text-left font-semibold mb-2 p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptatibus recusandae aliquam voluptas a quis laborum molestiae, vero harum laudantium, at, <a
          href="#"
          className='text-red-500 '
        >
          See Publication 
          <FontAwesomeIcon icon={faArrowTrendUp} />
        </a> </p>
       
      </div>
    </div>
  );
};

export default ShowProfile;
