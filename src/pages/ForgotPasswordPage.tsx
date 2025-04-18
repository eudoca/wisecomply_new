import React, { useState } from 'react';
import { Button } from '../components/ui/Button'; // Corrected path
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    '24/7 secure access restoration',
    'Two-factor authentication support',
    'Encrypted password reset process',
    'Immediate account recovery',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setIsSubmitted(true);
    // In a real app, you would trigger an API call here
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <Button
            variant="secondary"
            className="mb-8 text-sm"
            onClick={() => window.history.back()} // Simple back navigation
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to login
          </Button>

          <img src="/logo.png" alt="WiseComply Logo" className="h-16 mb-8" />

          {!isSubmitted ? (
            <>
              {/* Form View */}
              <h2 className="text-3xl font-bold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you instructions to
                reset your password
              </p>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(''); // Clear error on change
                      }}
                      required
                      className={`mt-1 block w-full px-3 py-2 border ${
                        error ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-[#8065F2] focus:border-[#8065F2]`}
                      aria-describedby={error ? "email-error" : undefined}
                    />
                    {error && (
                       <p id="email-error" className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Submission Success View */}
              <div className="text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Check your email
                </h2>
                <p className="text-gray-600">
                  We've sent password reset instructions to {email}
                </p>
                <Button
                   variant="secondary"
                   className="mt-8"
                   onClick={() => {
                     setIsSubmitted(false); // Allow trying again
                     setEmail('');
                   }}
                 >
                  Try another email
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Promotional Panel (Hidden on smaller screens) */}
      <div className="hidden lg:flex flex-1 bg-[#8065F2] text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-8">
            Secure account recovery system
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
                 src="https://randomuser.me/api/portraits/women/45.jpg" // Example image
                 alt="Testimonial"
                 className="w-12 h-12 rounded-full"
               />
               <div>
                 <p className="font-medium">Emma Wilson</p>
                 <p className="text-sm text-white/80">
                   Operations Manager, Kiwi Care Foundation
                 </p>
              </div>
            </div>
            <p className="text-white/90 italic">
              "The account recovery process was quick and secure. I was back to
              managing our compliance requirements in no time."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional: Default export if preferred
// export default ForgotPasswordPage; 