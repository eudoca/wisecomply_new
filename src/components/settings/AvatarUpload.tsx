import React, { useState, useRef } from 'react';
import { CameraIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Standardized path
import { UploadCloudIcon, Trash2Icon } from 'lucide-react';

interface AvatarUploadProps {
  initials: string;
  // Add imageUrl prop if an image exists
  // imageUrl?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ initials /* imageUrl */ }) => {
   const handleUploadClick = () => {
     // Trigger file input click or open modal
     alert('Avatar upload functionality not implemented.');
   };

  return (
    <div className="relative inline-block group">
      {/* Display image if available, otherwise initials */}
      {/* {imageUrl ? ( 
         <img src={imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" /> 
       ) : ( */} 
         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium text-gray-600">
           {initials}
         </div>
      {/* )} */} 
      <Button 
         variant="outline"
         size="sm" 
         onClick={handleUploadClick}
         className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-300 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
         aria-label="Upload new profile picture"
      >
        <CameraIcon className="w-4 h-4 text-gray-600" />
      </Button>
    </div>
  );
};

export default AvatarUpload; 