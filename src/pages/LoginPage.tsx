import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const benefits = [
    'Real-time compliance updates',
    'Secure document access',
    'Team collaboration tools',
    'Automated reporting dashboard'
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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Handle successful login
      console.log('Login attempted:', formData);
      // Use the full URL to ensure it works in production
      window.location.href = window.location.origin + '/compliance';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-sm" leftIcon={<ArrowLeftIcon className="w-4 h-4" />}>
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
          
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue managing your compliance requirements
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
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-brand-primary hover:text-brand-dark">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-primary hover:text-brand-dark">
                Create one now
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-brand-primary text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-8">
            Your compliance dashboard awaits
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
              <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Testimonial" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-white/80">
                  Compliance Officer, Community Trust NZ
                </p>
              </div>
            </div>
            <p className="text-white/90 italic">
              "The dashboard gives me instant visibility of our compliance
              status. It's become an essential part of our daily operations."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};