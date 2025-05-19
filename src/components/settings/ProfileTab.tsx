import React, { useState } from 'react';
import AvatarUpload from './AvatarUpload'; // Import from same directory
import { Button } from '@/components/ui/button'; // Standardized path

const ProfileTab = () => {
  // In a real app, fetch initial profile data
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '021-555-1234',
    position: 'Chairperson',
  });
  
  // Add state for disabling fields or showing loading
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setIsSaving(true);
     // Simulate API call
     console.log('Saving profile:', profile);
     setTimeout(() => {
       setIsSaving(false);
       alert('Profile saved successfully!');
     }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Personal Information
      </h2>
      <div className="mb-8 flex items-center gap-4">
        <AvatarUpload initials={`${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`} />
        <div>
           <p className="text-sm font-medium text-gray-700">Profile Picture</p>
           <p className="text-xs text-gray-500">Update your photo</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Input Fields */} 
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div>
               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                 First name
               </label>
               <input
                 id="firstName"
                 name="firstName"
                 type="text"
                 value={profile.firstName}
                 onChange={handleInputChange}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                 required
               />
             </div>
             <div>
               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                 Last name
               </label>
               <input
                 id="lastName"
                 name="lastName"
                 type="text"
                 value={profile.lastName}
                 onChange={handleInputChange}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                 required
               />
             </div>
         </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
             id="email"
             name="email"
             type="email"
             value={profile.email}
             onChange={handleInputChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
             required
           />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone number
          </label>
          <input
             id="phone"
             name="phone"
             type="tel"
             value={profile.phone}
             onChange={handleInputChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
           />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
            Position / Role
          </label>
          <input
             id="position"
             name="position"
             type="text"
             value={profile.position}
             onChange={handleInputChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
           />
        </div>
      </div>
      
      {/* Action Button */} 
       <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end">
         <Button type="submit" isLoading={isSaving} disabled={isSaving}>
           Save Changes
         </Button>
       </div>
    </form>
  );
};

export default ProfileTab; 