import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DeleteMember = ({ person, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-6" >
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-3"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1 className="text-lg font-semibold mb-4">Delete Member Details</h1>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete member details? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 font-semibold text-white rounded-md"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMember;
