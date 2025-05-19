import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '../../wizard/RadioGroup'; // Assuming path
import { Alert } from '../../wizard/Alert'; // Assuming path
import { PlusIcon, Trash2Icon } from 'lucide-react';

interface Step3ContactPersonProps {
  onComplete: () => void; 
}

interface ContactPerson {
  id: number; // Simple unique ID for mapping
  name?: string; // Added name for clarity
  postalAddress?: string;
  email?: string;
  phone?: string;
  preferredContact?: 'Email' | 'Phone' | 'Post' | null;
}

interface Step3FormData {
  contactPersons: ContactPerson[];
  registerChange?: boolean | null | 'N/A'; // Added N/A option
}

const Step3ContactPerson: React.FC<Step3ContactPersonProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step3FormData>({ contactPersons: [] });
  const [errors, setErrors] = useState<Record<string, string>>({}); // For validation errors

  const addContactPerson = () => {
    if (formData.contactPersons.length >= 3) {
      setErrors(prev => ({ ...prev, list: 'You can nominate a maximum of 3 contact persons.' }));
      return;
    }
    setErrors(prev => ({ ...prev, list: '' })); // Clear list error
    setFormData(prev => ({
      ...prev,
      contactPersons: [...prev.contactPersons, { id: Date.now(), preferredContact: null } ] // Add new empty person with unique ID
    }));
  };

  const removeContactPerson = (id: number) => {
    setFormData(prev => ({
      ...prev,
      contactPersons: prev.contactPersons.filter(person => person.id !== id)
    }));
     // Clear list error if count becomes valid
     if (formData.contactPersons.length - 1 > 0 && formData.contactPersons.length - 1 <= 3) {
       setErrors(prev => ({ ...prev, list: '' }));
     }
  };

  const handleContactChange = (id: number, field: keyof ContactPerson, value: any) => {
    setFormData(prev => ({
      ...prev,
      contactPersons: prev.contactPersons.map(person => 
        person.id === id ? { ...person, [field]: value } : person
      )
    }));
    // Add individual field validation if needed
  };

  const handleRegisterChange = (value: any) => {
    const val = value === 'N/A' ? 'N/A' : value;
     setFormData(prev => ({ ...prev, registerChange: val }));
  };
  
  const validateForm = (): boolean => {
      let isValid = true;
      const newErrors: Record<string, string> = {};

      if (formData.contactPersons.length === 0 || formData.contactPersons.length > 3) {
          newErrors.list = 'Please nominate between 1 and 3 contact persons.';
          isValid = false;
      }

      formData.contactPersons.forEach((p, index) => {
          if (!p.name) newErrors[`person_${p.id}_name`] = `Name is required for contact person ${index + 1}`;
          if (!p.postalAddress) newErrors[`person_${p.id}_address`] = `Postal Address is required for contact person ${index + 1}`;
          if (!p.email) newErrors[`person_${p.id}_email`] = `Email is required for contact person ${index + 1}`;
          // Basic email format check
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (p.email && !emailRegex.test(p.email)) newErrors[`person_${p.id}_email`] = `Invalid email format for contact person ${index + 1}`;
          if (!p.preferredContact) newErrors[`person_${p.id}_preferred`] = `Preferred contact method is required for contact person ${index + 1}`;
          
          if (Object.keys(newErrors).some(key => key.startsWith(`person_${p.id}`))) isValid = false;
      });
      
      if (formData.registerChange === undefined || formData.registerChange === null) {
          newErrors.registerChange = 'Please answer the register change question.';
          isValid = false;
      }

      setErrors(newErrors);
      return isValid;
  }

  const handleSaveAndComplete = () => {
    if (validateForm()) {
        console.log('Saving Step 3 Data:', formData);
        onComplete(); 
    } else {
        console.log("Validation failed", errors);
    }
  };

  return (
    <div>
      {/* 3.1 & 3.2 Contact Person Selection & Details */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-800 mb-2">3.1 Contact Person Selection</h3>
        <p className="text-sm text-gray-600 mb-4">Who will be the contact person(s) for your society? (1-3 required)</p>
         {errors.list && <Alert type="error" message={errors.list} />}
         
        <div className="space-y-6 mb-4">
          {formData.contactPersons.map((person, index) => (
            <div key={person.id} className="border border-gray-200 rounded-md p-4 relative">
               <h4 className="text-xs font-semibold mb-3 text-gray-700">Contact Person {index + 1}</h4>
                <button 
                 onClick={() => removeContactPerson(person.id)}
                 className="absolute top-2 right-2 text-gray-400 hover:text-red-600 p-1"
                 aria-label="Remove Contact Person"
               >
                 <Trash2Icon size={16} />
               </button>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                 <div>
                   <label htmlFor={`cp-name-${person.id}`} className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                   <Input 
                     id={`cp-name-${person.id}`}
                     name="name"
                     value={person.name || ''}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange(person.id, 'name', e.target.value)}
                     placeholder="Enter full name"
                   />
                   {errors[`person_${person.id}_name`] && <p className="mt-1 text-xs text-red-600">{errors[`person_${person.id}_name`]}</p>}
                 </div>
                 {/* Postal Address */}
                 <div>
                   <label htmlFor={`cp-address-${person.id}`} className="block text-xs font-medium text-gray-700 mb-1">Postal Address</label>
                   <Input 
                     id={`cp-address-${person.id}`}
                     name="postalAddress"
                     value={person.postalAddress || ''}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange(person.id, 'postalAddress', e.target.value)}
                     placeholder="Enter postal address"
                   />
                    {errors[`person_${person.id}_address`] && <p className="mt-1 text-xs text-red-600">{errors[`person_${person.id}_address`]}</p>}
                 </div>
                 {/* Email */}
                 <div>
                   <label htmlFor={`cp-email-${person.id}`} className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                   <Input 
                     id={`cp-email-${person.id}`}
                     name="email"
                     type="email"
                     value={person.email || ''}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange(person.id, 'email', e.target.value)}
                     placeholder="Enter email address"
                   />
                    {errors[`person_${person.id}_email`] && <p className="mt-1 text-xs text-red-600">{errors[`person_${person.id}_email`]}</p>}
                 </div>
                 {/* Phone */}
                 <div>
                   <label htmlFor={`cp-phone-${person.id}`} className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                   <Input 
                     id={`cp-phone-${person.id}`}
                     name="phone"
                     type="tel"
                     value={person.phone || ''}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange(person.id, 'phone', e.target.value)}
                     placeholder="Enter phone number"
                   />
                 </div>
                 {/* Preferred Contact Method */}
                 <div className="md:col-span-2"> {/* Span across two columns on medium screens */} 
                   <label htmlFor={`cp-preferred-${person.id}`} className="block text-xs font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                   <select
                     id={`cp-preferred-${person.id}`}
                     name="preferredContact"
                     value={person.preferredContact || ''}
                     onChange={(e) => handleContactChange(person.id, 'preferredContact', e.target.value as ContactPerson['preferredContact'])}
                     className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                   >
                     <option value="" disabled>Select method...</option>
                     <option value="Email">Email</option>
                     <option value="Phone">Phone</option>
                     <option value="Post">Post</option>
                   </select>
                   {errors[`person_${person.id}_preferred`] && <p className="mt-1 text-xs text-red-600">{errors[`person_${person.id}_preferred`]}</p>}
                 </div>
               </div>
             </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={addContactPerson} 
          disabled={formData.contactPersons.length >= 3}
          leftIcon={<PlusIcon size={16}/>}
        >
          Add Contact Person
        </Button>
      </div>

      {/* 3.3 Register Check */}
      <div className="mb-8">
        <RadioGroup
          label="3.3 Is this a change from your current registered contact person(s)?"
          name="registerChange"
          options={[
              { value: true, label: 'Yes' }, 
              { value: false, label: 'No' }, 
              { value: 'N/A', label: 'Not Applicable (New Society)' } 
            ]}
          value={formData.registerChange}
          onChange={handleRegisterChange}
        />
         {errors.registerChange && <p className="mt-1 text-xs text-red-600">{errors.registerChange}</p>}
        {formData.registerChange === true && (
          <Alert type="info" message="You will need to notify the Companies Office of this change after your registration/re-registration is complete." />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
        <Button onClick={handleSaveAndComplete} variant="primary">Save & Mark Complete</Button>
      </div>
    </div>
  );
};

export default Step3ContactPerson; 