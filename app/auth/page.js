'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? {
      email: formData.email,
      password: formData.password
    } : formData;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        router.push('/video-chat');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold"
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>
        
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
} 