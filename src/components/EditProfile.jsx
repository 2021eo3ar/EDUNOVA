import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRotate, faTrash } from '@fortawesome/free-solid-svg-icons';

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address'),
  status: z.string().min(1, 'Status is required'),
  team: z.string().min(1, 'Team is required'),
  avatar: z.any().optional(),
});

const EditProfile = ({ person, onClose, onUpdate }) => {
  const [avatarPreview, setAvatarPreview] = useState(person.avatar || null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: person.firstName || '',
      lastName: person.lastName || '',
      role: person.role || '',
      email: person.email || '',
      status: person.status || '',
      team: person.team || '',
      avatar: person.avatar || null,
    },
  });

  useEffect(() => {
    reset(person);
    setAvatarPreview(person.avatar || null);
  }, [person, reset]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue('avatar', file);
    }
  };

  const handlePhotoRemove = () => {
    setAvatarPreview(null);
    setValue('avatar', null);
  };

  const onSubmit = (data) => {
    onUpdate({
      ...person,
      avatar: data.avatar ? avatarPreview : person.avatar,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      email: data.email,
      status: data.status,
      team: data.team,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-black ">Edit Profile</h2>
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
                className="bg-white text-black border border-black px-4 py-2 rounded-sm  text-sm font-bold shadow-sm cursor-pointer flex items-center space-x-2 hover:bg-blue-50"
              >
                <FontAwesomeIcon icon={faCameraRotate} />
                <span>CHANGE PHOTO</span>
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
                  className="bg-white text-black border border-black text-sm font-bold px-4 py-2 rounded-sm shadow-sm flex items-center space-x-2 hover:bg-red-50 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>REMOVE PHOTO</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm  text-black font-semibold">FIRST NAME</label>
              <input
                type="text"
                {...register('firstName')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold  text-black ">LAST NAME</label>
              <input
                type="text"
                {...register('lastName')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold  text-black">ROLE</label>
              <select
                {...register('role')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Product Designer">Product Designer</option>
                <option value="Engineer">Engineer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.role && (
                <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold  text-black">STATUS</label>
              <select
                {...register('status')}
                className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold  text-black">TEAMS</label>
            <input
              type="text"
              {...register('team')}
              className="mt-1 block w-full border border-b-black rounded-sm shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.team && (
              <p className="text-red-600 text-sm mt-1">{errors.team.message}</p>
            )}
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

export default EditProfile;
