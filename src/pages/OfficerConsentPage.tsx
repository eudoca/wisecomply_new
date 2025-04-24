import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Mock society data - in a real app this would be fetched based on the URL params
const societyData = {
  name: "Community Garden Society",
  registrationNumber: "1234567",
  registrationDate: "15 January 2023",
  annualFilingDue: "31 March 2024"
};

const OfficerConsentPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    is_member: '',
    street_address: '',
    city: '',
    postcode: '',
    country: 'New Zealand', // Default
    email: '',
    date_elected: '',
    officer_declaration: false,
    date_signed: new Date().toISOString().split('T')[0] // Default to today
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const signatureRef = useRef<HTMLCanvasElement>(null);
  const [hasSignature, setHasSignature] = useState(false);

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error for this field when changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Simple signature pad functionality
  const [isDrawing, setIsDrawing] = useState(false);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = signatureRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = signatureRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    
    ctx.lineTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
    ctx.stroke();
    setHasSignature(true);
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearSignature = () => {
    const canvas = signatureRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Validate the form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Required fields
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    if (!formData.is_member) errors.is_member = 'Please select whether you are a member';
    if (!formData.street_address.trim()) errors.street_address = 'Street address is required';
    if (formData.street_address.toLowerCase().includes('po box') || formData.street_address.toLowerCase().includes('dx')) {
      errors.street_address = 'PO Box or DX addresses are not allowed';
    }
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postcode.trim()) errors.postcode = 'Post code is required';
    if (!formData.country.trim()) errors.country = 'Country is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.date_elected) errors.date_elected = 'Date elected/appointed is required';
    if (!formData.officer_declaration) errors.officer_declaration = 'You must agree to the declaration';
    if (!hasSignature) errors.signature = 'Signature is required';
    if (!formData.date_signed) errors.date_signed = 'Date signed is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // In a real application, you would submit the form data to your backend here
      // For this example, we'll just simulate a successful submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">Consent Form Submitted</h2>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for completing the officer consent form. Your submission has been received.
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">What happens next?</p>
              <p className="mt-1 text-sm text-gray-500">
                The society will be notified of your consent. Your details will be added to the officer register.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-xl font-bold text-white">
              Consent and Certificate of Officer
            </h1>
            <p className="text-blue-100 text-sm">
              Section 47 Incorporated Societies Act 2022
            </p>
          </div>

          {/* Society Information */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Society Information</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Society Name</p>
                  <p className="font-medium">{societyData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">{societyData.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-medium">{societyData.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Filing Due</p>
                  <p className="font-medium">{societyData.annualFilingDue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes for Officers */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Notes for Officers</h2>
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-sm text-gray-700">
              <p className="mb-2">
                Ensure that you meet the qualification criteria for being an officer of this society before signing this consent form (see the qualification criteria below).
              </p>
              <p className="mb-2">
                By signing this consent, you also consent to these details being added to the Incorporated Societies Register for this society. Your contact address and email address will only be visible to, and used by, the Registrar – they will not be displayed on the public register.
              </p>
              <p>
                Remember to advise the society any time these details change.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            {/* Officer Details Section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Officer Details</h2>
              <p className="text-sm text-gray-600 mb-4">
                Provide your full legal name as it appears on a form of identification, such as your driver licence or NZ passport.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name (as per ID) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={formErrors.first_name ? "border-red-500" : ""}
                  />
                  {formErrors.first_name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.first_name}</p>
                  )}
                </div>

                {/* Middle Name */}
                <div>
                  <Label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name(s)
                  </Label>
                  <Input
                    id="middle_name"
                    name="middle_name"
                    type="text"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={formErrors.last_name ? "border-red-500" : ""}
                  />
                  {formErrors.last_name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.last_name}</p>
                  )}
                </div>

                {/* Is Member */}
                <div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-1">
                      Are you a member of this society? <span className="text-red-500">*</span>
                    </legend>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="is_member_yes"
                          name="is_member"
                          type="radio"
                          value="yes"
                          checked={formData.is_member === 'yes'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="is_member_yes" className="ml-2 block text-sm text-gray-700">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="is_member_no"
                          name="is_member"
                          type="radio"
                          value="no"
                          checked={formData.is_member === 'no'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="is_member_no" className="ml-2 block text-sm text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  {formErrors.is_member && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.is_member}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="md:col-span-2">
                  <Label htmlFor="street_address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Number and Name <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-gray-500 mb-1">
                    This must be a street address that you use, it can't be a PO Box or DX address
                  </p>
                  <Input
                    id="street_address"
                    name="street_address"
                    type="text"
                    value={formData.street_address}
                    onChange={handleInputChange}
                    className={formErrors.street_address ? "border-red-500" : ""}
                  />
                  {formErrors.street_address && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.street_address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? "border-red-500" : ""}
                  />
                  {formErrors.city && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                  )}
                </div>

                {/* Postcode */}
                <div>
                  <Label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                    Post Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    type="text"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className={formErrors.postcode ? "border-red-500" : ""}
                  />
                  {formErrors.postcode && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.postcode}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={formErrors.country ? "border-red-500" : ""}
                  />
                  {formErrors.country && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.country}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                {/* Date Elected */}
                <div>
                  <Label htmlFor="date_elected" className="block text-sm font-medium text-gray-700 mb-1">
                    Date Elected or Appointed <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date_elected"
                    name="date_elected"
                    type="date"
                    value={formData.date_elected}
                    onChange={handleInputChange}
                    className={formErrors.date_elected ? "border-red-500" : ""}
                  />
                  {formErrors.date_elected && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.date_elected}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Officer Declaration Section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Officer Declaration</h2>
              
              <div className="mb-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="officer_declaration"
                      name="officer_declaration"
                      type="checkbox"
                      checked={formData.officer_declaration}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="officer_declaration" className="font-medium text-gray-700">
                      Officer Declaration <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-500">
                      I consent to be an officer of the above society and certify that I am not disqualified from being appointed or holding office as an officer of a society. Before signing this consent form, I have reviewed and confirm I meet the qualification criteria set out in section 47 of the Incorporated Societies Act 2022, and outlined below.
                    </p>
                  </div>
                </div>
                {formErrors.officer_declaration && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.officer_declaration}</p>
                )}
              </div>

              {/* Signature Pad */}
              <div className="mb-4">
                <Label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">
                  Signature <span className="text-red-500">*</span>
                </Label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <canvas
                    ref={signatureRef}
                    width={600}
                    height={150}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full bg-white touch-none"
                  />
                </div>
                <div className="mt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                {formErrors.signature && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.signature}</p>
                )}
              </div>

              {/* Date Signed */}
              <div className="max-w-xs">
                <Label htmlFor="date_signed" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Signed <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date_signed"
                  name="date_signed"
                  type="date"
                  value={formData.date_signed}
                  onChange={handleInputChange}
                  className={formErrors.date_signed ? "border-red-500" : ""}
                />
                {formErrors.date_signed && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.date_signed}</p>
                )}
              </div>
            </div>

            {/* Qualification Criteria Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Qualification Criteria</h2>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm">
                <p className="mb-2">
                  Before signing this consent form, ensure that you meet the qualification criteria set out in section 47 of the Incorporated Societies Act 2022.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Every officer of a society must be a natural person.</li>
                  <li>
                    The following persons are disqualified from being elected or appointed or otherwise holding office as an officer of a society:
                    <ol className="list-[lower-alpha] pl-5 pt-2 space-y-1">
                      <li>a person who is under 16 years of age</li>
                      <li>a person who is an undischarged bankrupt</li>
                      <li>a person who is prohibited from being a director or promoter of, or being concerned or taking part in the management of, an incorporated or unincorporated body under the Companies Act 1993, the Financial Markets Conduct Act 2013, or the Takeovers Act 1993</li>
                      <li>a person who is disqualified from being an officer of a charitable entity under the Charities Act 2005</li>
                      <li>
                        a person who has been convicted of any of the following, and has been sentenced for the offence, within the last 7 years:
                        <ol className="list-[lower-roman] pl-5 pt-1 space-y-1">
                          <li>an offence under subpart 6 of Part 4 of the Incorporated Societies Act 2022</li>
                          <li>a crime involving dishonesty (within the meaning of section 2(1) of the Crimes Act 1961)</li>
                          <li>an offence under section 143B of the Tax Administration Act 1994</li>
                          <li>an offence under section 22(2) of the Incorporated Societies Act 2022</li>
                          <li>an offence, in a country, State, or territory other than New Zealand, that is substantially similar to an offence specified in subparagraphs i. to iv.</li>
                          <li>a money laundering offence or an offence relating to the financing of terrorism, whether in New Zealand or elsewhere.</li>
                        </ol>
                      </li>
                      <li>
                        a person who is subject to any of the following orders:
                        <ol className="list-[lower-roman] pl-5 pt-1 space-y-1">
                          <li>a banning order under subpart 7 of Part 4 of the Incorporated Societies Act 2022</li>
                          <li>an order under section 108 of the Credit Contracts and Consumer Finance Act 2003</li>
                          <li>a forfeiture order under the Criminal Proceeds (Recovery) Act 2009</li>
                          <li>a property order made under the Protection of Personal and Property Rights Act 1988, or whose property is managed by a trustee corporation under section 32 of that Act.</li>
                        </ol>
                      </li>
                      <li>a person who is subject to an order that is substantially similar to an order referred to in paragraph f. under a law of a country, State, or territory outside New Zealand that is a country, State, or territory prescribed by the regulations.</li>
                      <li>in relation to the society, a person who does not comply with any qualifications for officers contained in the society's constitution.</li>
                    </ol>
                  </li>
                  <li>A natural person who is disqualified from being an officer but who acts as an officer is an officer for the purposes of a provision of this Act that imposes a duty or an obligation on an officer.</li>
                </ol>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Consent Form'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficerConsentPage; 