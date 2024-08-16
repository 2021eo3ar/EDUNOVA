import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRotate, faTrash } from '@fortawesome/free-solid-svg-icons';

const schema = z.object({
  fullName: z.string().min(2, 'Full Name is required').max(100, 'Full Name is too long'),
  role: z.string().min(2, 'Role is required').max(50, 'Role is too long'),
  email: z.string().email('Invalid email address'),
  status: z.string().min(2, 'Status is required').max(50, 'Status is too long'),
  team: z.string().min(2, 'Team is required').max(100, 'Team is too long'),
  contactNo: z.string().min(10, 'Phone Number is too short').max(15, 'Phone Number is too long').optional(),
  location: z.string().min(2, 'Location is required').max(100, 'Location is too long').optional(),
  gender: z.string().min(2, 'Location is required').max(100, 'Location is too long').optional(),
  nationality: z.string().min(2, 'Location is required').max(100, 'Location is too long').optional(),
  avatar: z
    .instanceof(File)
    .refine(file => file !== undefined, 'Photo is required')
    .optional(),
});

const AddMemberForm = ({ onClose, onSave }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue('avatar', file); // Set the file directly to avatar field
    }
  };

  const handlePhotoRemove = () => {
    setAvatarPreview(null);
    setValue('avatar', undefined); // Clear file input by setting it to undefined
  };

  const onSubmit = (data) => {
    const [firstName, ...lastNameArr] = data.fullName.split(' ');
    const lastName = lastNameArr.join(' ');

    // Create an object URL for the avatar to pass to the parent component
    const avatarUrl = avatarPreview || null;

    onSave({
      avatar: avatarUrl,
      firstName,
      lastName,
      role: data.role,
      email: data.email,
      status: data.status,
      team: data.team,
      contactNo: data.contactNo,
      location: data.location,
      gender : data.gender,
      nationality :data.nationality
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-black">Add New Member</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Uploaded"
                  className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-300"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faCameraRotate} className="text-gray-500" />
                </div>
              )}
            </div>
            <div className="flex space-x-4 mt-4">
              <label
                htmlFor="photo-upload"
                className="bg-white text-black border border-black px-4 py-2 rounded-md text-sm font-bold shadow-sm cursor-pointer flex items-center space-x-2 hover:bg-blue-50"
              >
                <FontAwesomeIcon icon={faCameraRotate} />
                <span>UPLOAD PHOTO</span>
                <input
                  type="file"
                  id="photo-upload"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {avatarPreview && (
                <button
                  onClick={handlePhotoRemove}
                  type="button"
                  className="bg-white text-black border border-black text-sm font-bold px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-red-50 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>REMOVE PHOTO</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-black font-semibold">FULL NAME</label>
              <input
                type="text"
                {...register('fullName')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">ROLE</label>
              <select
                {...register('role')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
              </select>
              {errors.role && (
                <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black">EMAIL</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">STATUS</label>
              <select
                {...register('status')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black">PHONE NUMBER</label>
              <input
                type="text"
                {...register('contactNo')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.contactNo && (
                <p className="text-red-600 text-sm mt-1">{errors.contactNo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">GENDER</label>
              <input
                type="text"
                {...register('gender')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">NATIONALITY</label>
              <input
                type="text"
                {...register('nationality')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.nationality && (
                <p className="text-red-600 text-sm mt-1">{errors.nationality.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">TEAM</label>
              <input
                type="text"
                {...register('team')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.team && (
                <p className="text-red-600 text-sm mt-1">{errors.team.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="text-black border-2 border-black font-semibold text-sm p-1.5 rounded-md hover:bg-gray-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="text-black border-2 border-black font-semibold text-sm p-2 rounded-md hover:bg-gray-300"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
