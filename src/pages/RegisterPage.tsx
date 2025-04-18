import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const benefits = [
    'Automated compliance tracking', 
    'Document generation tools', 
    'Role-based access control', 
    'Training management system'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      // In a real app, we would call an API to register the user
      // Redirect to the email confirmation page after successful form submission
      navigate('/confirm-email');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <Link to="/">
            <Button variant="secondary" className="mb-8 text-sm" leftIcon={<ArrowLeftIcon className="w-4 h-4" />}>
              Back to home
            </Button>
          </Link>

          <div className="mb-8">
            <img 
              src="/wisecomply-logo_color.png" 
              alt="WiseComply Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900">
            Start your compliance journey
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join hundreds of New Zealand non-profits managing their compliance
            with WiseComply
          </p>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    className={`mt-1 block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`} 
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    className={`mt-1 block w-full px-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`} 
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`} 
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`} 
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`} 
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-primary hover:text-brand-dark">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-brand-primary text-white p-12 flex-col justify-center">
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
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Testimonial" className="w-12 h-12 rounded-full" />
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