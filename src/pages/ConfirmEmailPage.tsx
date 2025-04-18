import React, { useState, useRef } from 'react';
import { Button } from '../components/ui/Button'; // Corrected path
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Renamed component from RegisterPage to ConfirmEmailPage
export const ConfirmEmailPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string>('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const benefits = [
    'Automated compliance tracking',
    'Document generation tools',
    'Role-based access control',
    'Training management system',
  ];

  const handleChange = (index: number, value: string) => {
    // Allow only single digit input
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      setError(''); // Clear error on valid input

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to the previous input field on backspace if current is empty
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    // TODO: Add actual verification logic here (e.g., API call)
    console.log('Verification code submitted:', code);
    // On success, navigate to wizard page
    alert('Verification successful (Simulated) - Navigating to Wizard...');
    navigate('/wizard'); // Navigate to /wizard
  };

  const handleResendCode = () => {
    // TODO: Add logic to resend code (e.g., API call)
    console.log('Resending verification code');
    alert('Verification code resent (Simulated)');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          {/* Back Button - Consider linking to /register or managing state */}
          <Button
            variant="secondary"
            className="mb-8 text-sm"
            onClick={() => window.history.back()} // Simple back navigation
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to sign up
          </Button>

          {/* Logo - Using the proper logo file */}
          <img src="/wisecomply-logo_color.png" alt="WiseComply Logo" className="h-10 mb-8" />

          <h2 className="text-3xl font-bold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to your email address. Please
            enter it below to continue.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Verification Code
              </label>
              <div className="flex justify-center space-x-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric" // Improves mobile experience
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-xl font-semibold border ${error && !verificationCode.join('') ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-[#8065F2] focus:border-[#8065F2] outline-none`}
                    aria-label={`Digit ${index + 1} of verification code`}
                  />
                ))}
              </div>
              {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
              <p className="mt-4 text-sm text-gray-500 text-center">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#8065F2] hover:text-[#6c54d8] font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8065F2] rounded"
                >
                  Resend code
                </button>
              </p>
            </div>

            <Button type="submit" className="w-full">
              Verify Email
            </Button>
          </form>
        </div>
      </div>

      {/* Right Promotional Panel */}
      <div className="hidden lg:flex flex-1 bg-[#8065F2] text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-8">
            Everything you need to manage compliance
          </h3>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-white" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          {/* Testimonial */}
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://randomuser.me/api/portraits/women/32.jpg" // Example image
                alt="Testimonial"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">Sarah Thompson</p>
                <p className="text-sm text-white/80">
                  Executive Director, Helping Hands NZ
                </p>
              </div>
            </div>
            <p className="text-white/90 italic">
              "WiseComply has transformed how we manage our compliance
              requirements. It's intuitive, comprehensive, and saves us
              countless hours every month."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 